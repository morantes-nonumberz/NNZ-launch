// NNZ site interactions and dynamic artist rendering
const YEAR_EL = document.getElementById("year");
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

// ---- Artist data ----
// Add your roster here. Replace the sample entries with your artists.
// 'spotify' must be a full Spotify artist URL (e.g., https://open.spotify.com/artist/{id})
const ARTISTS = [
  {
    name: "SkiMT",
    role: "Artist",
    image: "assets/SKIMT.jpeg",
    spotify: "https://open.spotify.com/artist/20wCNoXOG9bLhqm2yQ8vBF?si=XtssG5QSSXaNpqZozjy8Qg" // sample (The Weeknd) — replace
  },
  {
    name: "Rico TBW",
    role: "Artist",
    image: "assets/RICO.png",
    spotify: "https://open.spotify.com/artist/2BH6N2tMUGsXF1FkPpMgYz?si=eCpIxTHLRE6tJfc6q9YRJA" // sample (Ed Sheeran) — replace
  },
  {
    name: "SAMU",
    role: "Artist",
    image: "assets/SAMU.png",
    spotify: "https://open.spotify.com/artist/3DdUMIdATa1z7xDsRpNt59?si=Tvr51OS1Szeebv2q8H3CTw" // sample (Ariana Grande) — replace
  },
  {
    name: "MYNSK",
    role: "Artist",
    image: "assets/MYNSK.png",
    spotify: "https://open.spotify.com/artist/1XLFwDTuzaDxjWTeLPS0wm?si=akP3CHGkRn2pbqSkIS-JCA" // sample (Ariana Grande) — replace
  }
];

function toSpotifyEmbed(url){
  try{
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    // handle intl paths like /intl-es/
    const idxArtist = parts.indexOf("artist");
    if(idxArtist !== -1 && parts[idxArtist+1]){
      const id = parts[idxArtist+1];
      return `https://open.spotify.com/embed/artist/${id}?utm_source=generator`;
    }
    // fallback for other types (playlist, album, track)
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
    const p = el("p", { class: "artist-meta", text: "Managed by NNZ" });
    body.appendChild(h3); body.appendChild(p);
    card.appendChild(body);

    const actions = el("div", { class: "artist-actions" });
    const openBtn = el("a", { class: "btn btn-ghost", text: "Open on Spotify", attrs: { href: a.spotify, target: "_blank", rel: "noopener" } });
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
renderArtists();

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

document.querySelectorAll(".reveal-up").forEach((el) => io.observe(el));

// Contact form — simple client-side validation and mailto compose
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

function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  let ok = true;
  if(!data.name){ setError("name", "Required"); ok=false } else setError("name");
  if(!data.email || !validEmail(data.email)){ setError("email", "Valid email required"); ok=false } else setError("email");
  if(!data.subject){ setError("subject", "Required"); ok=false } else setError("subject");
  if(!data.reason){ setError("reason", "Select a reason"); ok=false } else setError("reason");
  if(!data.message){ setError("message", "Required"); ok=false } else setError("message");

  if(!ok) return;

  // Build mailto
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
  showToast("Opening your email app…");
});
