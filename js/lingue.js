// ===== Lingue: italiano e inglese =====
// L'italiano è il testo scritto in index.html. Ogni elemento con data-i18n="chiave" prende
// la versione inglese da EN[chiave]; data-i18n-alt / -placeholder / -title / -aria-label / -content
// fanno lo stesso per gli attributi. Per aggiungere un testo: data-i18n nella pagina + riga qui sotto.

const EN = {
  "meta.titolo": "Annalisa &amp; Piero · 1 May 2027",
  "meta.descrizione": "The wedding of Annalisa and Piero, Saturday 1 May 2027 at Portico del Seminario, Calcinate (Bergamo, Italy).",

  "nav.storia": "Our story",
  "nav.giorno": "The day",
  "nav.location": "Venue",
  "nav.arrivare": "Getting there",
  "nav.info": "Good to know",
  "nav.apri": "Open the menu",

  "hero.eyebrow": "We're getting married",
  "hero.data": 'Saturday 1 May 2027<span class="hero__time">at 12:30 pm</span>',
  "hero.luogo": "Portico del Seminario<span>Calcinate · Bergamo, Italy</span>",
  "hero.conferma": "RSVP",
  "hero.calendario": "Add to calendar",

  "storia.eyebrow": "The two of us",
  "storia.titolo": "Our story",
  "storia.incontro": "We met in Frankfurt on 19 September 2020.",

  "viaggi.eyebrow": "Around the world",
  "viaggi.globo": "Globe showing the places we've been",
  "viaggi.titolo": "Our travels",
  "viaggi.hint": "Tap a dot on the globe to see our photos.",

  "luogo.francoforte": "Frankfurt",
  "luogo.atene": "Athens",
  "luogo.giappone": "Japan",
  "luogo.venezia": "Venice",

  "t.incontro.data": "19 September 2020",
  "t.incontro.frase": "Where we met",
  "t.atene.data": "May – June 2021",
  "t.puglia.data": "Summer 2021",
  "t.foto.presto": "Photos coming soon.",
  "t.washington.data": "June – August 2024",
  "t.washington.frase": "Piero spends three months here.",
  "t.princeton.data": "January – March 2025",
  "t.princeton.frase": "Piero spends three months here.",
  "t.india.data": "March 2026",
  "t.california.data": "March – June 2026",
  "t.california.frase": "In Yosemite, Piero asked Annalisa to marry him.",
  "t.california.link": "Read about the proposal",
  "t.nozze.frase": "We're getting married!",
  "t.nozze.link": "See the venue",
  "t.giappone.data": "May 2027",
  "t.giappone.frase": "Our honeymoon",
  "t.giappone.regalo": "If you'd like to give us a gift, you can contribute to our honeymoon.",
  "t.giappone.iban": "Bank details (IBAN): coming soon.",
  "t.mare.luogo": "By the sea",
  "t.mare.dove": "Where? To be confirmed",

  "foto.noi": "Annalisa and Piero",
  "foto.atene": "Annalisa and Piero in Athens, with the Acropolis in the background",
  "foto.agra": "Annalisa and Piero in front of the Taj Mahal",
  "foto.india": "Annalisa and Piero in traditional Indian clothes",
  "foto.francoforte": "Annalisa and Piero in Frankfurt, by the river Main at night",
  "foto.newyork": "Annalisa and Piero in New York, with the Empire State Building in the background",
  "foto.proposta1": "Annalisa and Piero in Yosemite, showing the engagement ring",
  "foto.proposta2": "Annalisa and Piero in front of Yosemite Falls",
  "foto.proposta3": "Annalisa and Piero at a viewpoint next to a waterfall in Yosemite",
  "foto.venezia": "Annalisa and Piero in Venice, above the Grand Canal",
  "foto.trabucco": "Annalisa and Piero on a trabucco, a traditional fishing platform over the sea",
  "foto.mare": "Annalisa and Piero at a viewpoint over the sea",
  "foto.tramonto": "Annalisa and Piero on the beach at sunset",
  "foto.disegno": "Drawing of the courtyard of Portico del Seminario",

  "didascalia.atene": "With the Acropolis behind us",
  "didascalia.agra": "The Taj Mahal",
  "didascalia.india": "In traditional clothes",
  "didascalia.francoforte": "An evening by the Main",
  "didascalia.newyork": "With the Empire State Building",
  "didascalia.yosemite": "Yosemite Falls",
  "didascalia.anello": "With the ring",
  "didascalia.venezia": "Over the Grand Canal",
  "didascalia.trabucco": "On the trabucco",
  "didascalia.mare": "At the viewpoint",
  "didascalia.tramonto": "At sunset",

  "proposta.titolo": "The proposal",
  "proposta.testo": "It was in Yosemite, California, that Piero asked Annalisa to marry him. And she said yes!",
  "proposta.giornata": "That day we went on a very long hike: the Mist Trail, Vernal Fall and then all the way up to Nevada Fall. Down in the valley we stopped by the Merced River and beneath El Capitan, and in the evening had dinner there. Back in our room, Piero popped the question.",

  "data.breve": "1 May 2027",
  "data.lunga": "Saturday 1 May 2027",

  "giorno.titolo": "The day",
  "giorno.cerimonia": "Ceremony",
  "giorno.navetta": "Shuttle bus",
  "giorno.navetta.dove": "Leaves from Bergamo railway station",
  "giorno.navetta.ritorno": "Shuttle bus back",
  "giorno.navetta.ritorno.dove": "From Portico del Seminario to Bergamo railway station",
  "giorno.poi": "then",
  "giorno.aperitivo": "In the cloister and the Italian garden",
  "giorno.pranzo": "Lunch",
  "giorno.pranzo.dove": "In the frescoed halls",
  "giorno.torta": "Cutting the cake",
  "giorno.dj": "Dancing until midnight",

  "location.eyebrow": "Where",
  "location.storia":
    "A country residence dating back to the fifteenth century, in the lands around Bergamo once ruled by " +
    "Bartolomeo Colleoni. Owned by a noble family for generations, it was donated to the Diocese of Bergamo " +
    "by a noblewoman and, after a careful restoration, came back to life in 2022.",
  "location.spazi":
    "Waiting for us are the cloister with its arcades on Sarnico stone columns, the Hall of Frescoes, " +
    "rooms with frescoed vaults and ceilings, and the Secret Garden: river-pebble walls, centuries-old " +
    "trees and a corner shaded by willows.",
  "location.indirizzo": "<strong>Portico del Seminario</strong><br>Via Portico del Seminario, 1<br>24050 Calcinate (BG), Italy",
  "location.maps": "Open in Google Maps",
  "location.mappa": "Map of Portico del Seminario",

  "arrivare.eyebrow": "Travel",
  "arrivare.titolo": "Getting there",
  "arrivare.auto": "By car",
  "arrivare.auto.testo":
    "Calcinate is about 20 minutes from Bergamo. On the A4 Milan–Venice motorway, the most convenient exits " +
    "are Seriate or Grumello del Monte; from there, follow the signs for Calcinate.",
  "arrivare.parcheggio": "The venue has a large private car park.",
  "arrivare.aereo": "By plane",
  "arrivare.aereo.testo":
    "<strong>Bergamo Orio al Serio</strong> is the closest airport, about 15 km away.<br>" +
    "Alternatively, Milan Linate (about 55 km) or Milan Malpensa (about 100 km).",
  "arrivare.treno": "By train",
  "arrivare.treno.testo": "The main station is Bergamo; from there it's best to continue by taxi or car.",
  "arrivare.navetta": "<strong>Shuttle bus:</strong> leaves Bergamo railway station at 11:00 and leaves Portico del Seminario at midnight (see above).",
  "navetta.titolo": "The shuttle bus",
  "navetta.sotto": "A coach for everyone staying in Bergamo: we'll take you to the party and bring you back.",
  "navetta.disegno": "The shuttle bus: at 11:00 from Bergamo railway station to Portico del Seminario, back at midnight",
  "navetta.andata": "Departure from Bergamo railway station",
  "navetta.durata": "≈ 30 min",
  "navetta.arrivo": "Arrival at Portico del Seminario, in time for the 12:30 ceremony",
  "navetta.ritorno": "At midnight we leave Portico del Seminario to go back to the station",
  "navetta.prenota": "Book your seat in the RSVP form",
  "navetta.ritrovo": "exact meeting point outside the station: to be confirmed",

  "info.eyebrow": "Everything you need to know",
  "info.titolo": "Good to know",
  "info.dormire": "Where can I stay?",
  "info.dormire.testo": "1 May is a public holiday in Italy and falls on a Saturday: we recommend booking well in advance.",
  "info.dormire.navetta": "We recommend staying in Bergamo, near the railway station: the shuttle bus leaves from there at 11:00 and brings you back at midnight.",
  "info.dormire.mappa": "See hotels near the station on Google Maps",
  "info.cibo": "I have dietary requirements",
  "info.cibo.testo":
    "No problem: vegetarian, vegan and gluten-free menus are available. " +
    "Just let us know in the RSVP form, along with any allergies.",
  "info.accesso": "Is the venue accessible?",
  "info.accesso.testo": "Yes: Portico del Seminario is step-free and has a lift to the upper floors.",
  "info.bambini": "Can I bring children?",
  "info.lista": "Gift list",
  "info.lista.testo": "The most important thing for us is having you there.",
  "info.lista.dafare": "Gift list / bank details: coming soon.",
  "info.foto": "Photos of the day",
  "info.foto.dafare": "Hashtag or shared album: to be confirmed.",
  "dadefinire": "To be confirmed.",

  "rsvp.eyebrow": "Will you be there?",
  "rsvp.titolo": "RSVP",
  "rsvp.scadenza": 'Please reply by <span class="tbd">— date to be confirmed</span>.',
  "rsvp.nome": "Full name",
  "rsvp.contatto": "Email or phone",
  "rsvp.presenza": "Will you join us?",
  "rsvp.si": "Yes, with pleasure",
  "rsvp.no": "Sadly, no",
  "rsvp.persone": "How many people (including you)?",
  "rsvp.accompagnatori": "Names of those coming with you",
  "rsvp.facoltativo": "Optional",
  "rsvp.esigenze": "Dietary requirements or allergies",
  "rsvp.esigenze.esempio": "E.g. vegetarian, coeliac, nut allergy…",
  "rsvp.navetta": "Will you take the shuttle bus from Bergamo?",
  "rsvp.navetta.nota": "Outward at 11:00 from Bergamo railway station, back at midnight from Portico del Seminario to the station.",
  "rsvp.navetta.ar": "Yes, there and back",
  "rsvp.navetta.andata": "Only there",
  "rsvp.navetta.ritorno": "Only back",
  "rsvp.navetta.no": "No, we'll make our own way",
  "rsvp.navetta.posti": "How many seats on the shuttle?",
  "rsvp.messaggio": "A message for the couple",
  "rsvp.invia": "Send reply",

  "footer.su": "Back to top ↑",
  "chiudi": "Close",

  // invito digitale (invito.html)
  "invito.meta.titolo": "An invitation for you · Annalisa &amp; Piero",
  "invito.apri": "Open the invitation",
  "invito.per": "for",
  "invito.tocca": "Tap the seal to open",
  "invito.frase": "together with their families<br>invite you to celebrate their wedding",
  "invito.quando": 'Saturday 1 May 2027<span class="b-ora">at 12:30 pm</span>',
  "invito.indirizzo": "Via Portico del Seminario 1 · Calcinate (Bergamo), Italy",
  "invito.pranzo": "lunch to follow",
  "invito.rsvp": "Kindly reply by 31 March",
  "invito.conferma": "RSVP",
  "invito.sito": "Visit our website",
  "invito.richiudi": "Close the envelope",
};

// Testi creati dal codice (messaggi del modulo, calendario, mappamondo)
const MESSAGGI = {
  it: {
    "rsvp.errore": "Compila nome, contatto e indica se parteciperai.",
    "rsvp.anteprima": "Le conferme non sono ancora aperte: le attiveremo insieme agli inviti. Grazie!",
    "rsvp.invio": "Invio in corso…",
    "rsvp.errore.invio": "Non siamo riusciti a inviare la risposta: controlla la connessione e riprova.",
    "rsvp.grazie.si": "Grazie! Non vediamo l'ora di festeggiare con te.",
    "rsvp.grazie.no": "Grazie per averci avvisato, ci mancherai!",
    "calendario.titolo": "Matrimonio Annalisa & Piero",
    "luogo.francoforte": "Francoforte",
    "luogo.atene": "Atene",
    "luogo.puglia": "Puglia",
    "luogo.washington": "Washington DC",
    "luogo.princeton": "Princeton",
    "luogo.india": "India",
    "luogo.california": "California",
    "luogo.calcinate": "Calcinate",
    "luogo.giappone": "Giappone",
    "luogo.venezia": "Venezia",
    "luogo.newyork": "New York",
  },
  en: {
    "rsvp.errore": "Please fill in your name and contact details, and let us know if you can come.",
    "rsvp.anteprima": "RSVPs aren't open yet: we'll open them when the invitations go out. Thank you!",
    "rsvp.invio": "Sending…",
    "rsvp.errore.invio": "We couldn't send your reply: please check your connection and try again.",
    "rsvp.grazie.si": "Thank you! We can't wait to celebrate with you.",
    "rsvp.grazie.no": "Thank you for letting us know, we'll miss you!",
    "calendario.titolo": "Annalisa & Piero's wedding",
  },
};

const Lingua = (() => {
  const LINGUE = ["it", "en"];
  const ATTRIBUTI = ["alt", "placeholder", "title", "aria-label", "content"];
  const originali = new Map(); // elemento -> testo italiano (innerHTML e attributi)
  let attuale = "it";

  function ricorda(el) {
    if (originali.has(el)) return originali.get(el);
    const testo = { html: el.innerHTML };
    for (const a of ATTRIBUTI) if (el.hasAttribute(`data-i18n-${a}`)) testo[a] = el.getAttribute(a);
    originali.set(el, testo);
    return testo;
  }

  function applica(lingua) {
    attuale = LINGUE.includes(lingua) ? lingua : "it";
    const en = attuale === "en";
    document.documentElement.lang = attuale;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const it = ricorda(el).html;
      el.innerHTML = en ? EN[el.dataset.i18n] || it : it;
    });
    for (const a of ATTRIBUTI) {
      document.querySelectorAll(`[data-i18n-${a}]`).forEach((el) => {
        const it = ricorda(el)[a];
        el.setAttribute(a, en ? EN[el.getAttribute(`data-i18n-${a}`)] || it : it);
      });
    }
    document.querySelectorAll(".lang__btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === attuale)));
    document.dispatchEvent(new CustomEvent("cambiolingua", { detail: attuale }));
  }

  // Scelta iniziale: ?lang=en nell'indirizzo, poi l'ultima scelta fatta, poi la lingua del browser
  function iniziale() {
    const daUrl = new URLSearchParams(location.search).get("lang");
    if (LINGUE.includes(daUrl)) return daUrl;
    try {
      const salvata = localStorage.getItem("lingua");
      if (LINGUE.includes(salvata)) return salvata;
    } catch (e) {
      // memoria del browser non disponibile: si usa la lingua del browser
    }
    const browser = (navigator.languages && navigator.languages[0]) || navigator.language || "it";
    return browser.toLowerCase().startsWith("it") ? "it" : "en";
  }

  document.querySelectorAll(".lang__btn").forEach((b) =>
    b.addEventListener("click", () => {
      applica(b.dataset.lang);
      try {
        localStorage.setItem("lingua", b.dataset.lang);
      } catch (e) {
        // la scelta vale solo per questa visita
      }
    })
  );

  applica(iniziale());

  return {
    get attuale() {
      return attuale;
    },
    // i nomi dei luoghi in inglese stanno in EN, insieme agli altri testi della pagina
    t: (chiave) => MESSAGGI[attuale][chiave] || (attuale === "en" && EN[chiave]) || MESSAGGI.it[chiave],
  };
})();
