// ===== Impostazioni del sito =====
const CONFIG = {
  // Indirizzo dell'app web del Foglio Google che raccoglie le risposte RSVP (finisce con /exec).
  // Si crea con strumenti/rsvp-foglio-google.gs. Vuoto = le conferme non sono ancora aperte (nessun invio).
  rsvpUrl: "https://script.google.com/macros/s/AKfycbyxII7iHu6sZO8zl6nriUrQwxRtXwSIsvRneNAZBEeiccCn0t2Dmnb5ByXOS5nspiziaA/exec",
  event: {
    // il titolo dell'evento è in js/lingue.js ("calendario.titolo"), nelle due lingue
    location: "Portico del Seminario, Via Portico del Seminario 1, 24050 Calcinate (BG)",
    // In UTC: 12:30 – 24:00 ora italiana (CEST, UTC+2)
    start: "20270501T103000Z",
    end: "20270501T220000Z",
  },
};

// ===== Menu mobile =====
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav__menu a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ===== I nostri viaggi sul mappamondo =====
// Ogni <li class="meta" data-luogo="id"> è un posto: diventa un punto sul globo e un nome nella lista.
// Qui ci sono le coordinate [lon, lat]; i nomi, nelle due lingue, sono in js/lingue.js ("luogo.<id>").
const LUOGHI = {
  francoforte: [8.6821, 50.1109],
  atene: [23.7257, 37.9715],
  puglia: [16.8719, 41.1171],
  venezia: [12.3155, 45.4408],
  washington: [-77.0369, 38.9072],
  princeton: [-74.6551, 40.3431],
  newyork: [-73.9857, 40.7484],
  india: [78.0421, 27.1751],
  california: [-119.5936, 37.7456],
  calcinate: [9.7831, 45.6067],
  giappone: [139.6503, 35.6762],
};
const LUOGO_NOZZE = "calcinate";
const LUOGHI_FUTURI = new Set(["giappone"]);

const fermo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const viaggi = document.querySelector(".viaggi");
if (viaggi) creaViaggi(viaggi);

function creaViaggi(contenitore) {
  const mete = [...contenitore.querySelectorAll(".meta")].map((li) => ({
    li,
    bottone: li.querySelector(".meta__nome"),
    luogo: li.dataset.luogo in LUOGHI ? li.dataset.luogo : null,
  }));
  const cartolina = contenitore.querySelector(".cartolina");
  const contenuto = cartolina.querySelector(".cartolina__contenuto");
  const inColonna = window.matchMedia("(max-width: 860px)");
  let aperta = null;

  // La cartolina ripete data, nome e frase del posto e ne copia testi e foto
  function riempi(meta) {
    contenuto.textContent = "";
    const aggiungi = (tag, classe, fonte) => {
      if (!fonte || !fonte.textContent.trim()) return;
      const el = document.createElement(tag);
      el.className = classe + (fonte.classList.contains("tbd") ? " tbd" : "");
      el.textContent = fonte.textContent.trim();
      contenuto.appendChild(el);
    };
    aggiungi("p", "eyebrow", meta.li.querySelector(".meta__data"));
    aggiungi("h3", "cartolina__luogo", meta.li.querySelector(".meta__luogo"));
    aggiungi("p", "cartolina__frase", meta.li.querySelector(".meta__frase"));
    const dettagli = meta.li.querySelector(".meta__dettagli");
    for (const figlio of dettagli ? dettagli.children : []) {
      const copia = figlio.cloneNode(true);
      // la copia non va tradotta da sola: al cambio lingua la cartolina viene rifatta
      [copia, ...copia.querySelectorAll("*")].forEach((n) =>
        [...n.attributes].forEach((a) => a.name.startsWith("data-i18n") && n.removeAttribute(a.name))
      );
      contenuto.appendChild(copia);
    }
  }

  // Apre un posto (un secondo clic sul suo nome lo chiude)
  function apri(meta, { daGlobo = false } = {}) {
    const chiudi = !meta || (!daGlobo && aperta === meta);
    aperta = chiudi ? null : meta;
    for (const m of mete) {
      m.li.classList.toggle("is-open", m === aperta);
      m.bottone.setAttribute("aria-expanded", String(m === aperta));
    }
    if (aperta) riempi(aperta);
    cartolina.hidden = !aperta;
    if (globo) globo.mostra(aperta);
    // su telefono le foto stanno sotto il globo: le porto in vista
    if (aperta && inColonna.matches) {
      cartolina.scrollIntoView({ behavior: fermo ? "auto" : "smooth", block: "nearest" });
    }
  }
  mete.forEach((m) => m.bottone.addEventListener("click", () => apri(m)));
  cartolina.querySelector(".cartolina__chiudi").addEventListener("click", () => apri(null));
  document.addEventListener("cambiolingua", () => aperta && riempi(aperta));

  let globo = null;
  try {
    globo = creaMappamondo(contenitore.querySelector(".globo"), mete, apri);
    contenitore.querySelector(".viaggi__globo").hidden = false;
  } catch (err) {
    // Senza mappamondo restano i nomi dei posti: ognuno apre la sua cartolina con le foto.
  }
}

function creaMappamondo(svg, mete, apri) {
  const { d3, topojson, MONDO } = window;
  if (!d3 || !topojson || !MONDO) throw new Error("mappamondo non disponibile");

  const NS = "http://www.w3.org/2000/svg";
  const SIZE = 500;
  const RAGGIO = 236;
  const VISITATI = new Set(["Germany", "Greece", "Italy", "United States of America", "India"]);

  const paesi = topojson.feature(MONDO, MONDO.objects.countries).features;
  const visitati = { type: "FeatureCollection", features: paesi.filter((p) => VISITATI.has(p.properties.name)) };
  const altri = { type: "FeatureCollection", features: paesi.filter((p) => !VISITATI.has(p.properties.name)) };
  const confini = topojson.mesh(MONDO, MONDO.objects.countries, (a, b) => a !== b);
  const griglia = d3.geoGraticule10();

  const proiezione = d3.geoOrthographic().scale(RAGGIO).translate([SIZE / 2, SIZE / 2]).clipAngle(90).precision(0.6);
  const disegna = d3.geoPath(proiezione);
  let rotazione = [-12, -38]; // parte con l'Europa al centro

  const crea = (tag, attributi, genitore) => {
    const nodo = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attributi)) nodo.setAttribute(k, v);
    genitore.appendChild(nodo);
    return nodo;
  };

  svg.innerHTML = `<defs>
    <radialGradient id="globo-mare" cx="40%" cy="35%" r="70%">
      <stop offset="0" stop-color="#eef2ec"/><stop offset="1" stop-color="#cdd8d5"/>
    </radialGradient>
    <radialGradient id="globo-luce" cx="36%" cy="30%" r="74%">
      <stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#3e5b35" stop-opacity=".2"/>
    </radialGradient>
  </defs>`;
  const mare = crea("path", { class: "globo__mare" }, svg);
  const linee = crea("path", { class: "globo__griglia" }, svg);
  const terra = crea("path", { class: "globo__terra" }, svg);
  const terraVisitata = crea("path", { class: "globo__visitati" }, svg);
  const bordi = crea("path", { class: "globo__confini" }, svg);
  crea("circle", { class: "globo__luce", cx: SIZE / 2, cy: SIZE / 2, r: RAGGIO }, svg);
  crea("circle", { class: "globo__bordo", cx: SIZE / 2, cy: SIZE / 2, r: RAGGIO }, svg);
  const puntini = crea("g", {}, svg);

  let trascinato = false;
  const pin = {};
  for (const meta of mete) {
    const id = meta.luogo;
    if (!id) continue;
    const tipo = id === LUOGO_NOZZE ? " pin--nozze" : LUOGHI_FUTURI.has(id) ? " pin--futuro" : "";
    const g = crea("g", { class: "pin" + tipo }, puntini);
    crea("circle", { class: "pin__alone", r: 7 }, g);
    crea("circle", { class: "pin__area", r: 16 }, g);
    if (id === LUOGO_NOZZE) crea("path", { class: "pin__punto", d: "M0 7C-12-1-8-13 0-6.5C8-13 12-1 0 7Z" }, g);
    else crea("circle", { class: "pin__punto", r: 6 }, g);
    const etichette = [crea("text", { class: "pin__nome", y: -15, "text-anchor": "middle" }, g), crea("title", {}, g)];
    pin[id] = { g, coord: LUOGHI[id], etichette };
    g.addEventListener("click", () => {
      if (!trascinato) apri(meta, { daGlobo: true });
    });
  }
  const nomina = () =>
    Object.entries(pin).forEach(([id, p]) => p.etichette.forEach((e) => (e.textContent = Lingua.t(`luogo.${id}`))));
  nomina();
  document.addEventListener("cambiolingua", nomina);

  function disegnaGlobo() {
    proiezione.rotate(rotazione);
    const centro = [-rotazione[0], -rotazione[1]];
    mare.setAttribute("d", disegna({ type: "Sphere" }));
    linee.setAttribute("d", disegna(griglia) || "");
    terra.setAttribute("d", disegna(altri) || "");
    terraVisitata.setAttribute("d", disegna(visitati) || "");
    bordi.setAttribute("d", disegna(confini) || "");
    for (const p of Object.values(pin)) {
      const visibile = d3.geoDistance(p.coord, centro) < Math.PI / 2 - 0.06;
      p.g.style.display = visibile ? "" : "none";
      if (visibile) {
        const [x, y] = proiezione(p.coord);
        p.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      }
    }
  }

  // Giro lento finché nessuno sceglie un posto o tocca il globo
  let toccato = false;
  let giro = null;
  function avviaGiro() {
    if (fermo || toccato || giro) return;
    let prima = performance.now();
    const passo = (t) => {
      rotazione = [rotazione[0] + (t - prima) * 0.006, rotazione[1]];
      prima = t;
      disegnaGlobo();
      giro = requestAnimationFrame(passo);
    };
    giro = requestAnimationFrame(passo);
  }
  function fermaGiro() {
    cancelAnimationFrame(giro);
    giro = null;
  }
  new IntersectionObserver(([voce]) => (voce.isIntersecting ? avviaGiro() : fermaGiro())).observe(svg);

  // Volo verso il posto scelto
  let volo = null;
  function volaVerso([lon, lat]) {
    const da = rotazione.slice();
    let dLon = (-lon - da[0]) % 360;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    const a = [da[0] + dLon, -lat];
    const inizio = performance.now();
    const durata = fermo ? 0 : 1200;
    cancelAnimationFrame(volo);
    const passo = (t) => {
      const k = durata ? Math.min(1, (t - inizio) / durata) : 1;
      const e = k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2;
      rotazione = [da[0] + (a[0] - da[0]) * e, da[1] + (a[1] - da[1]) * e];
      disegnaGlobo();
      if (k < 1) volo = requestAnimationFrame(passo);
    };
    volo = requestAnimationFrame(passo);
  }

  // Trascinamento (in verticale su touch la pagina continua a scorrere)
  svg.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    toccato = true;
    fermaGiro();
    cancelAnimationFrame(volo);
    trascinato = false;
    const scala = SIZE / svg.getBoundingClientRect().width;
    const x0 = e.clientX;
    const y0 = e.clientY;
    const r0 = rotazione.slice();
    svg.classList.add("is-dragging");
    const muovi = (ev) => {
      const dx = (ev.clientX - x0) * scala;
      const dy = (ev.clientY - y0) * scala;
      if (Math.abs(dx) + Math.abs(dy) > 4) trascinato = true;
      rotazione = [r0[0] + dx * 0.4, Math.max(-75, Math.min(75, r0[1] - dy * 0.4))];
      disegnaGlobo();
    };
    const fine = () => {
      svg.classList.remove("is-dragging");
      window.removeEventListener("pointermove", muovi);
      window.removeEventListener("pointerup", fine);
      window.removeEventListener("pointercancel", fine);
    };
    window.addEventListener("pointermove", muovi);
    window.addEventListener("pointerup", fine);
    window.addEventListener("pointercancel", fine);
  });

  disegnaGlobo();

  return {
    // Ruota fino al posto scelto e ne accende il punto
    mostra(meta) {
      for (const [id, p] of Object.entries(pin)) p.g.classList.toggle("is-active", Boolean(meta) && meta.luogo === id);
      if (!meta || !meta.luogo) return;
      toccato = true;
      fermaGiro();
      volaVerso(LUOGHI[meta.luogo]);
    },
  };
}

// ===== Aggiungi al calendario (.ics) =====
function icsEscape(text) {
  return text.replace(/([,;\\])/g, "\\$1");
}

document.getElementById("add-to-calendar").addEventListener("click", () => {
  const { location, start, end } = CONFIG.event;
  const title = Lingua.t("calendario.titolo");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Annalisa e Piero//Matrimonio//IT",
    "BEGIN:VEVENT",
    "UID:matrimonio-annalisa-piero-20270501",
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${icsEscape(title)}`,
    `LOCATION:${icsEscape(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "matrimonio-annalisa-piero.ics" });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// ===== RSVP =====
const form = document.getElementById("rsvp-form");
const status = document.getElementById("rsvp-status");
const attendingOnly = form.querySelectorAll("[data-if-attending]");
const navettaOnly = form.querySelector("[data-if-navetta]");
let postiToccati = false; // finché non li cambia a mano, i posti in navetta seguono il numero di persone

// mostra solo le domande che servono: niente dettagli se non viene, niente posti se non prende la navetta
function aggiornaModulo() {
  const coming = form.elements.presenza.value !== "No";
  const navetta = form.elements.navetta.value;
  attendingOnly.forEach((el) => (el.hidden = !coming));
  navettaOnly.hidden = !coming || !navetta || navetta === "No";
  const persone = Math.max(1, parseInt(form.elements.persone.value, 10) || 1);
  form.elements.posti_navetta.max = persone;
  if (!postiToccati || form.elements.posti_navetta.value > persone) form.elements.posti_navetta.value = persone;
}

form.addEventListener("change", aggiornaModulo);
form.elements.persone.addEventListener("input", aggiornaModulo);
form.elements.posti_navetta.addEventListener("input", () => (postiToccati = true));

// i messaggi restano nella lingua in cui sono stati scritti: al cambio lingua li tolgo
document.addEventListener("cambiolingua", () => {
  status.textContent = "";
  status.classList.remove("is-error");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.classList.remove("is-error");

  const required = [form.elements.nome, form.elements.contatto];
  let valid = true;
  required.forEach((input) => {
    const ok = input.value.trim() !== "";
    input.closest(".field").classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });
  if (!form.elements.presenza.value) valid = false;

  if (!valid) {
    status.textContent = Lingua.t("rsvp.errore");
    status.classList.add("is-error");
    return;
  }

  const data = new FormData(form);
  const coming = data.get("presenza") === "Sì";
  const lines = [
    `Nome: ${data.get("nome")}`,
    `Contatto: ${data.get("contatto")}`,
    `Presenza: ${data.get("presenza")}`,
  ];
  if (coming) {
    lines.push(
      `Persone: ${data.get("persone")}`,
      `Accompagnatori: ${data.get("accompagnatori") || "-"}`,
      `Esigenze alimentari: ${data.get("esigenze_alimentari") || "-"}`,
      `Navetta: ${data.get("navetta") || "non indicato"}`
    );
    if (data.get("navetta") && data.get("navetta") !== "No") lines.push(`Posti in navetta: ${data.get("posti_navetta")}`);
  }
  lines.push(`Messaggio: ${data.get("messaggio") || "-"}`);

  // campo trappola invisibile: lo compilano solo i programmi che mandano spam
  if (data.get("sito_web")) {
    status.textContent = Lingua.t(coming ? "rsvp.grazie.si" : "rsvp.grazie.no");
    form.reset();
    return;
  }

  if (!CONFIG.rsvpUrl) {
    console.info("RSVP (anteprima, non inviato):\n" + lines.join("\n"));
    status.textContent = Lingua.t("rsvp.anteprima");
    return;
  }

  // la risposta finisce in una riga del Foglio Google degli sposi
  const invio = new URLSearchParams();
  const campi = coming
    ? ["nome", "contatto", "presenza", "persone", "accompagnatori", "esigenze_alimentari", "navetta", "messaggio"]
    : ["nome", "contatto", "presenza", "messaggio"];
  campi.forEach((k) => invio.append(k, (data.get(k) || "").trim()));
  if (coming && data.get("navetta") && data.get("navetta") !== "No") invio.append("posti_navetta", data.get("posti_navetta"));
  invio.append("lingua", document.documentElement.lang);

  const bottone = form.querySelector('button[type="submit"]');
  bottone.disabled = true;
  status.textContent = Lingua.t("rsvp.invio");
  fetch(CONFIG.rsvpUrl, { method: "POST", mode: "no-cors", body: invio })
    .then(() => {
      status.textContent = Lingua.t(coming ? "rsvp.grazie.si" : "rsvp.grazie.no");
      form.reset();
      postiToccati = false;
      aggiornaModulo();
    })
    .catch(() => {
      status.textContent = Lingua.t("rsvp.errore.invio");
      status.classList.add("is-error");
    })
    .finally(() => {
      bottone.disabled = false;
    });
});

// ===== Animazione all'ingresso delle sezioni =====
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}
