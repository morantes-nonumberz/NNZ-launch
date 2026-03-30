/* ═══════════════════════════════════════════
   NNZ — No Numberz
   script.js
   ─────────────────────────────────────────
   Table of Contents:
   1.  Footer year
   2.  Loader
   3.  Navigation scroll effect
   4.  Hamburger / Mobile menu
   5.  Scroll reveal
   6.  Video filter + lightbox
   7.  Gallery lightbox
   8.  Contact form (Formspree AJAX)
═══════════════════════════════════════════ */


/* ─── 0. i18n — Language Toggle ─────────────── */
const TRANSLATIONS = {
  en: {
    'nav.artists':    'Artists',
    'nav.gallery':    'Gallery',
    'nav.press':      'Press',
    'nav.store':      'Store',
    'nav.contact':    'Contact',
    'nav.cta':        'Get in touch',
    'lightbox.close': '✕ Close',
    'hero.sub':       'NNZ is a management agency focused on impact and craft — bridging the gap between artistic vision and industry reach.',
    'hero.btn1':      'View Roster',
    'hero.btn2':      'Work with us',
    'hero.scroll':    'Scroll',
    'artists.tag':    'Roster',
    'artists.heading':'OUR<br>ARTISTS',
    'artists.count':  '4 Active Artists',
    'stats.managed':  'Artists Managed',
    'stats.followers':'TikTok Followers',
    'stats.likes':    'TikTok Likes',
    'stats.based':    'Based In',
    'videos.tag':     'Visual',
    'videos.heading': 'MUSIC<br>VIDEOS',
    'videos.all':     'All',
    'gallery.tag':    'Behind the scenes',
    'gallery.heading':'GALLERY',
    'press.tag':      'News',
    'press.heading':  'PRESS &amp;<br>UPDATES',
    'press.featured.title':  "No Numberz launches — Medellín's newest artist management agency is here",
    'press.featured.excerpt':'NNZ is redefining what artist management means in Colombia\'s urban music scene, with a roster that spans R&B, trap, hip-hop and more. Four artists. One vision. No limits.',
    'press.readmore':        'Read more',
    'press.rico.title':      'Rico TBW crosses 80K followers on TikTok',
    'press.rico.excerpt':    'Rico TBW\'s organic TikTok growth hits a new milestone with 80K followers and 3.3M total likes — all without a label push.',
    'press.followtiktok':    'Follow on TikTok',
    'press.skimt.title':     'SkiMT drops new music — available now on Spotify',
    'press.skimt.excerpt':   'SkiMT continues to push the boundaries of Colombian R&B and trap with fresh releases that are building steady momentum on streaming platforms.',
    'press.listenspotify':   'Listen on Spotify',
    'press.samu.title':      'SAMU and MYNSK join the NNZ family',
    'press.samu.excerpt':    'NNZ expands its roster with two new additions — SAMU and MYNSK — bringing the total to four artists across urban, alternative and hip-hop.',
    'press.viewroster':      'View Roster',
    'store.tag':             'Store',
    'store.heading':         'MERCH &amp;<br>MUSIC',
    'store.desc':            'Support the artists directly. Grab exclusive merch and stream their music on every platform.',
    'store.tee.desc':        'Classic heavyweight tee. NNZ logo front, blacked out. Limited run.',
    'store.keychain.desc':   '3D Printed Keychain. NNZ edition, limited drop.',
    'store.cap.desc':        'Structured 6-panel cap. Embroidered NNZ logo. One size fits most.',
    'store.buy':             'Buy Now',
    'store.stream.heading':  'STREAM THE<br>MUSIC',
    'store.stream.desc':     'All four NNZ artists are on every major platform. Pick yours and start listening.',
    'store.listen':          'Listen →',
    'store.follow':          'Follow →',
    'contact.tag':           'Contact',
    'contact.heading':       "LET'S<br>BUILD.",
    'contact.desc':          "For bookings, press, media, and collaboration opportunities — reach out below and we'll get back to you.",
    'contact.email':         'Email',
    'contact.based':         'Based In',
    'contact.openfor':       'Open For',
    'contact.services':      'Bookings · Press · Collaborations',
    'form.name':             'Name',
    'form.name.placeholder': 'Your name',
    'form.email':            'Email',
    'form.reason':           'Reason',
    'form.reason.default':   'Select a reason',
    'form.booking':          'Booking',
    'form.collab':           'Collaboration',
    'form.inquiry':          'General Inquiry',
    'form.message':          'Message',
    'form.message.placeholder': 'Tell us what you have in mind…',
    'form.send':             'Send Message',
    'form.sending':          'Sending…',
    'form.success':          "✓ Message sent! We'll get back to you soon.",
    'footer.desc':           'A Medellín-based artist management agency focused on impact, craft, and building careers that last.',
    'footer.navigate':       'Navigate',
    'footer.rights':         'All rights reserved.',
  },
  es: {
    'nav.artists':    'Artistas',
    'nav.gallery':    'Galería',
    'nav.press':      'Prensa',
    'nav.store':      'Tienda',
    'nav.contact':    'Contacto',
    'nav.cta':        'Contáctanos',
    'lightbox.close': '✕ Cerrar',
    'hero.sub':       'NNZ es una agencia de management enfocada en el impacto y el oficio — conectando la visión artística con el alcance de la industria.',
    'hero.btn1':      'Ver Artistas',
    'hero.btn2':      'Trabaja con nosotros',
    'hero.scroll':    'Deslizar',
    'artists.tag':    'Plantel',
    'artists.heading':'NUESTROS<br>ARTISTAS',
    'artists.count':  '4 Artistas Activos',
    'stats.managed':  'Artistas Gestionados',
    'stats.followers':'Seguidores TikTok',
    'stats.likes':    'Likes TikTok',
    'stats.based':    'Ubicados En',
    'videos.tag':     'Visual',
    'videos.heading': 'VIDEOS<br>MUSICALES',
    'videos.all':     'Todos',
    'gallery.tag':    'Detrás de cámaras',
    'gallery.heading':'GALERÍA',
    'press.tag':      'Noticias',
    'press.heading':  'PRENSA &amp;<br>NOTICIAS',
    'press.featured.title':  'No Numberz lanza — la nueva agencia de management de artistas de Medellín ya está aquí',
    'press.featured.excerpt':'NNZ está redefiniendo lo que significa el management artístico en la escena musical urbana de Colombia, con un plantel que abarca R&B, trap, hip-hop y más. Cuatro artistas. Una visión. Sin límites.',
    'press.readmore':        'Leer más',
    'press.rico.title':      'Rico TBW supera los 80K seguidores en TikTok',
    'press.rico.excerpt':    'El crecimiento orgánico de Rico TBW en TikTok alcanza un nuevo hito con 80K seguidores y 3.3M de likes en total — todo sin el respaldo de un sello discográfico.',
    'press.followtiktok':    'Seguir en TikTok',
    'press.skimt.title':     'SkiMT lanza nueva música — disponible ahora en Spotify',
    'press.skimt.excerpt':   'SkiMT sigue empujando los límites del R&B y trap colombiano con nuevos lanzamientos que están ganando impulso constante en las plataformas de streaming.',
    'press.listenspotify':   'Escuchar en Spotify',
    'press.samu.title':      'SAMU y MYNSK se unen a la familia NNZ',
    'press.samu.excerpt':    'NNZ amplía su plantel con dos nuevas incorporaciones — SAMU y MYNSK — llevando el total a cuatro artistas entre lo urbano, lo alternativo y el hip-hop.',
    'press.viewroster':      'Ver Artistas',
    'store.tag':             'Tienda',
    'store.heading':         'MERCH &amp;<br>MÚSICA',
    'store.desc':            'Apoya a los artistas directamente. Consigue merch exclusivo y escucha su música en todas las plataformas.',
    'store.tee.desc':        'Camiseta pesada clásica. Logo NNZ al frente, en negro. Edición limitada.',
    'store.keychain.desc':   'Llavero impreso en 3D. Edición NNZ, drop limitado.',
    'store.cap.desc':        'Gorra estructurada de 6 paneles. Logo NNZ bordado. Talla única.',
    'store.buy':             'Comprar',
    'store.stream.heading':  'ESCUCHA LA<br>MÚSICA',
    'store.stream.desc':     'Los cuatro artistas de NNZ están en todas las plataformas. Elige la tuya y empieza a escuchar.',
    'store.listen':          'Escuchar →',
    'store.follow':          'Seguir →',
    'contact.tag':           'Contacto',
    'contact.heading':       'CONSTRUYAMOS.',
    'contact.desc':          'Para reservas, prensa, medios y oportunidades de colaboración — escríbenos y te respondemos pronto.',
    'contact.email':         'Correo',
    'contact.based':         'Ubicados En',
    'contact.openfor':       'Disponibles Para',
    'contact.services':      'Reservas · Prensa · Colaboraciones',
    'form.name':             'Nombre',
    'form.name.placeholder': 'Tu nombre',
    'form.email':            'Correo',
    'form.reason':           'Motivo',
    'form.reason.default':   'Selecciona un motivo',
    'form.booking':          'Reserva',
    'form.collab':           'Colaboración',
    'form.inquiry':          'Consulta General',
    'form.message':          'Mensaje',
    'form.message.placeholder': 'Cuéntanos lo que tienes en mente…',
    'form.send':             'Enviar Mensaje',
    'form.sending':          'Enviando…',
    'form.success':          '✓ ¡Mensaje enviado! Te respondemos pronto.',
    'footer.desc':           'Una agencia de management de artistas basada en Medellín, enfocada en el impacto, el oficio y la construcción de carreras duraderas.',
    'footer.navigate':       'Navegar',
    'footer.rights':         'Todos los derechos reservados.',
  }
};

let currentLang = localStorage.getItem('nnz-lang') || 'en';

function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Inner HTML (for elements with <br> or entities)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Lang toggle active state
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('nnz-lang', lang);
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyTranslations(currentLang === 'en' ? 'es' : 'en');
});

applyTranslations(currentLang);


/* ─── 1. Footer Year ────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();


/* ─── 2. Loader ─────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('out'), 1900);
});


/* ─── 3. Navigation Scroll Effect ───────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ─── 4. Hamburger / Mobile Menu ────────────── */
const hbg = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');

hbg.addEventListener('click', () => {
  const isOpen = hbg.classList.toggle('open');
  mob.classList.toggle('open', isOpen);
  hbg.setAttribute('aria-expanded', isOpen);
  mob.setAttribute('aria-hidden', !isOpen);
});

function closeMenu() {
  hbg.classList.remove('open');
  mob.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  mob.setAttribute('aria-hidden', 'true');
}

// Expose closeMenu globally so inline onclick attributes in the HTML can call it
window.closeMenu = closeMenu;


/* ─── 5. Scroll Reveal ───────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 6. Video Filter + Lightbox ────────────── */

// Filter buttons
document.querySelectorAll('.vf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.vcard').forEach(card => {
      const show = filter === 'all' || card.dataset.artist === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Video lightbox open/close
const vbox      = document.getElementById('vbox');
const vboxFrame = document.getElementById('vboxFrame');

function closeVideoBox() {
  vbox.classList.remove('open');
  vboxFrame.src = '';
}

document.getElementById('vboxClose').addEventListener('click', closeVideoBox);
vbox.addEventListener('click', e => { if (e.target === vbox) closeVideoBox(); });

// Open lightbox on thumbnail click / keyboard
document.querySelectorAll('.vcard-thumb').forEach(thumb => {
  const openVideo = () => {
    const vid = thumb.closest('.vcard').dataset.vid;
    if (!vid || vid.startsWith('REPLACE')) {
      alert('Add a real YouTube video ID to this card in the HTML.');
      return;
    }
    vboxFrame.src = `https://www.youtube.com/embed/${vid}?autoplay=1`;
    vbox.classList.add('open');
  };

  thumb.addEventListener('click', openVideo);
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openVideo();
  });
});


/* ─── 7. Gallery Lightbox ────────────────────── */
const gbox    = document.getElementById('gbox');
const gboxImg = document.getElementById('gboxImg');
let galleryItems = [];
let galleryIdx   = 0;

// Build gallery item list from data attributes
document.querySelectorAll('.gitem').forEach((item, i) => {
  galleryItems.push({ src: item.dataset.src, label: item.dataset.label });

  item.addEventListener('click', () => {
    galleryIdx   = i;
    gboxImg.src  = galleryItems[i].src;
    gboxImg.alt  = galleryItems[i].label;
    gbox.classList.add('open');
  });
});

function closeGalleryBox() { gbox.classList.remove('open'); }

document.getElementById('gboxClose').addEventListener('click', closeGalleryBox);
gbox.addEventListener('click', e => { if (e.target === gbox) closeGalleryBox(); });

document.getElementById('gboxPrev').addEventListener('click', () => {
  galleryIdx = (galleryIdx - 1 + galleryItems.length) % galleryItems.length;
  gboxImg.src = galleryItems[galleryIdx].src;
  gboxImg.alt = galleryItems[galleryIdx].label;
});

document.getElementById('gboxNext').addEventListener('click', () => {
  galleryIdx = (galleryIdx + 1) % galleryItems.length;
  gboxImg.src = galleryItems[galleryIdx].src;
  gboxImg.alt = galleryItems[galleryIdx].label;
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeVideoBox();
    closeGalleryBox();
  }
  if (gbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  document.getElementById('gboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('gboxNext').click();
  }
});


/* ─── 8. Contact Form (Formspree AJAX) ───────── */
const form    = document.getElementById('cform');
const status  = document.getElementById('fstatus');
const sendBtn = document.getElementById('fsend');

const SEND_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
  <line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/>
</svg>`;

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Loading state
  sendBtn.disabled = true;
  const sendSpan = sendBtn.querySelector('[data-i18n="form.send"]');
  if (sendSpan) sendSpan.textContent = TRANSLATIONS[currentLang]['form.sending'];
  else sendBtn.textContent = TRANSLATIONS[currentLang]['form.sending'];
  status.className = 'fstatus';

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      status.className = 'fstatus ok';
      status.textContent = TRANSLATIONS[currentLang]['form.success'];
      form.reset();

      // Track conversion in GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label:    'NNZ Contact Form',
        });
      }
    } else {
      const data = await res.json();
      throw new Error(data?.errors?.[0]?.message || 'Submission failed.');
    }
  } catch (err) {
    status.className = 'fstatus err';
    status.textContent = '✗ ' + (err.message || 'Could not send. Email us directly.');
  } finally {
    sendBtn.disabled  = false;
    sendBtn.innerHTML = `<span data-i18n="form.send">${TRANSLATIONS[currentLang]['form.send']}</span> ${SEND_ICON}`;
  }
});
