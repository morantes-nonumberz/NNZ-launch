// NNZ site with i18n + artists

// Year
const YEAR_EL = document.getElementById("year");
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

// Roster (your data)
const ARTISTS = [
  {
    name: "SkiMT",
    role: "Artist",
    image: "assets/placeholder-1.webp",
    spotify: "https://open.spotify.com/artist/20wCNoXOG9bLhqm2yQ8vBF?si=XtssG5QSSXaNpqZozjy8Qg"
  },
  {
    name: "Rico TBW",
    role: "Artist",
    image: "assets/placeholder-2.webp",
    spotify: "https://open.spotify.com/artist/2BH6N2tMUGsXF1FkPpMgYz?si=eCpIxTHLRE6tJfc6q9YRJA"
  },
  {
    name: "SAMU",
    role: "Artist",
    image: "assets/placeholder-3.webp",
    spotify: "https://open.spotify.com/artist/3DdUMIdATa1z7xDsRpNt59?si=Tvr51OS1Szeebv2q8H3CTw"
  },
  {
    name: "MYNSK",
    role: "Artist",
    image: "assets/placeholder-3.webp",
    spotify: "https://open.spotify.com/artist/1XLFwDTuzaDxjWTeLPS0wm?si=akP3CHGkRn2pbqSkIS-JCA"
  }
];

// i18n dictionaries
const I18N = {
  en: {
    "meta.title": "No Numberz (NNZ) — Artist Management",
    "meta.description": "No Numberz (NNZ) Management — Discover our roster and reach out.",

    "nav.artists": "Artists",
    "nav.contact": "Contact",

    "hero.headline": "Artist management redefined.",
    "hero.subhead": "NNZ is a management agency focused on impact and craft. Explore our roster and tap straight into Spotify.",
    "cta.viewArtists": "View Artists",
    "cta.contact": "Contact",

    "artists.title": "Artists",
    "artists.kicker": "Tap to open Spotify or listen in-page.",

    "contact.title": "Contact",
    "contact.kicker": "For bookings, media, and opportunities — use the form below.",

    "form.nameLabel": "Name",
    "form.namePh": "Your name",
    "form.emailLabel": "Email",
    "form.emailPh": "you@example.com",
    "form.subjectLabel": "Subject",
    "form.subjectPh": "Subject",
    "form.reasonLabel": "Reason",
    "form.reasonSelect": "Select a reason",
    "form.messageLabel": "Message",
    "form.messagePh": "Tell us the essentials…",
    "form.send": "Send",
    "form.note": "This form opens your email client to send directly to <strong>morantes@nonumberz.com</strong>. For custom server handling, wire the form to your backend endpoint.",

    "footer.rights": "All rights reserved.",
    "footer.built": "Built with care. <span class=\"dot\"></span>",

    "artist.meta": "Managed by NNZ",
    "artist.open": "Open on Spotify",

    "form.reasonOptions": ["Booking","Press / Media","Collaboration","General Inquiry"],

    "toast.mail": "Opening your email app…",
    "val.required": "Required",
    "val.email": "Valid email required",
    "val.select": "Select a reason",
  },
  es: {
    "meta.title": "No Numberz (NNZ) — Management de artistas",
    "meta.description": "No Numberz (NNZ) — Descubre nuestro roster y contáctanos.",

    "nav.artists": "Artistas",
    "nav.contact": "Contacto",

    "hero.headline": "Management de artistas, bien hecho.",
    "hero.subhead": "NNZ es una agencia enfocada en impacto y detalle. Explora nuestro roster y escucha en Spotify.",
    "cta.viewArtists": "Ver artistas",
    "cta.contact": "Contacto",

    "artists.title": "Artistas",
    "artists.kicker": "Toca para abrir en Spotify o escuchar aquí.",

    "contact.title": "Contacto",
    "contact.kicker": "Para bookings, prensa y oportunidades — usa el formulario.",

    "form.nameLabel": "Nombre",
    "form.namePh": "Tu nombre",
    "form.emailLabel": "Correo",
    "form.emailPh": "tucorreo@ejemplo.com",
    "form.subjectLabel": "Asunto",
    "form.subjectPh": "Asunto",
    "form.reasonLabel": "Motivo",
    "form.reasonSelect": "Selecciona un motivo",
    "form.messageLabel": "Mensaje",
    "form.messagePh": "Cuéntanos lo esencial…",
    "form.send": "Enviar",
    "form.note": "Este formulario abre tu app de correo y envía a <strong>morantes@nonumberz.com</strong>. Para manejo en servidor, conéctalo a tu backend.",

    "footer.rights": "Todos los derechos reservados.",
    "footer.built": "Hecho con cariño. <span class=\"dot\"></span>",

    "artist.meta": "Representado por NNZ",
    "artist.open": "Abrir en Spotify",

    "form.reasonOptions": ["Booking","Prensa / Media","Colaboración","Consulta general"],

    "toast.mail": "Abriendo tu app de correo…",
    "val.required": "Obligatorio",
    "val.email": "Correo válido requerido",
    "val.select": "Selecciona un motivo",
  }
};

const LANG_KEY = "nnz_lang";
let currentLang = localStorage.getItem(LANG_KEY) || "en";

function applyI18n(lang){
  const dict = I18N[lang] || I18N.en;

  // Text
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  // Select options
  document.querySelectorAll("[data-i18n-sel]").forEach(sel=>{
    const key = sel.getAttribute("data-i18n-sel");
    const opts = dict[key];
    if (Array.isArray(opts)){
      const first = sel.querySelector("option[value='']") || sel.querySelector("option:disabled");
      sel.innerHTML = "";
      if (first){
        const opt0 = document.createElement("option");
        opt0.value = "";
        opt0.disabled = true; opt0.selected = true;
        opt0.textContent = dict["form.reasonSelect"];
        sel.appendChild(opt0);
      }
      opts.forEach(text=>{
                const o = document.createElement("option");
        o.textContent = text;
        sel.appendChild(o);
      });
    }
  });

  // Toggle label + lang attr
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = lang === "en" ? "ES" : "EN";
  document.documentElement.setAttribute("lang", lang);

  // Persist
  localStorage.setItem(LANG_KEY, lang);
  currentLang = lang;

  // expose for validation/toast
  window.NNZ_I18N = dict;
}

// Spotify helpers
function toSpotifyEmbed(url){
  try{
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const idxArtist = parts.indexOf("artist");
    if(idxArtist !== -1 && parts[idxArtist+1]){
      const id = parts[idxArtist+1];
      return `https://open.spotify.com/embed/artist/${id}?utm_source=generator`;
    }
    if(parts[0] && parts[1]){
      return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}?utm_source=generator`;
    }
  }catch(e){}
  return null;
}

function el(tag, opts = {}){
  const n = document.createElement(tag);
  if(opts.class) n.className = opts.class;
  if(opts.html) n.innerHTML = opts.html;
  if(opts.text) n.textContent = opts.text;
  if(opts.attrs) Object.entries(opts.attrs).forEach(([k,v]) => n.setAttribute(k,v));
  return n;
}

function renderArtists(){
  const grid = document.getElementById("artistGrid");
  grid.innerHTML = "";
  ARTISTS.forEach(a => {
    const card = el("article", { class: "artist-card card reveal-up" });

    const cover = el("div", { class: "cover" });
    const img = el("img", { attrs: { src: a.image || "assets/placeholder-1.webp", alt: `${a.name} cover` } });
    cover.appendChild(img);
    const badge = el("span", { class: "badge", text: a.role || "Artist" });
    cover.appendChild(badge);
    card.appendChild(cover);

    const body = el("div", { class: "body" });
    const h3 = el("h3", { class: "artist-name", text: a.name });
    const p = el("p", { class: "artist-meta", text: I18N[currentLang]["artist.meta"] });
    body.appendChild(h3); body.appendChild(p);
    card.appendChild(body);

    const actions = el("div", { class: "artist-actions" });
    const openBtn = el("a", { class: "btn btn-ghost", text: I18N[currentLang]["artist.open"], attrs: { href: a.spotify, target: "_blank", rel: "noopener" } });
    actions.appendChild(openBtn);

    const embedUrl = toSpotifyEmbed(a.spotify);
    if(embedUrl){
      const iframe = el("iframe", { class: "spotify-embed", attrs: { src: embedUrl, allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" } });
      card.appendChild(iframe);
    }
    card.appendChild(actions);

    grid.appendChild(card);
  });
}

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

// Init
applyI18n(currentLang);
document.querySelectorAll(".reveal-up").forEach((el) => io.observe(el));
renderArtists();

// Toggle language
document.getElementById("langToggle")?.addEventListener("click", ()=>{
  const next = currentLang === "en" ? "es" : "en";
  applyI18n(next);
  renderArtists(); // update strings inside cards
});

// Contact form
const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}
function setError(id, msg){
  const small = document.querySelector(`small[data-for="${id}"]`);
  if (small) small.textContent = msg || "";
}
function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  let ok = true;
  if(!data.name){ setError("name", I18N[currentLang]["val.required"]); ok=false } else setError("name");
  if(!data.email || !validEmail(data.email)){ setError("email", I18N[currentLang]["val.email"]); ok=false } else setError("email");
  if(!data.subject){ setError("subject", I18N[currentLang]["val.required"]); ok=false } else setError("subject");
  if(!data.reason){ setError("reason", I18N[currentLang]["val.select"]); ok=false } else setError("reason");
  if(!data.message){ setError("message", I18N[currentLang]["val.required"]); ok=false } else setError("message");

  if(!ok) return;

  const to = "morantes@nonumberz.com";
  const subject = encodeURIComponent(`[NNZ] ${data.subject} — ${data.reason}`);
  const body = encodeURIComponent(
`Name: ${data.name}
Email: ${data.email}
Reason: ${data.reason}

${data.message}

— Sent from nonumberz.com`
  );
  const url = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = url;
  showToast(I18N[currentLang]["toast.mail"]);
});
