/* ══════════════════════════════════════════════
   LegaXy Sports Academy — Shared Components
   Injects navbar, mobile menu, footer, scroll bar
   ══════════════════════════════════════════════ */

(function() {

  // ── Detect active page for nav highlight ──
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const NAV_MAP = {
    'about.html': 0,
    'sports.html': 1,
    'how-it-works.html': 2,
    'programs.html': 3,
    'athletes.html': 4,
    'schools.html': 5,
    'contact.html': 6,
    'demo.html': 6
  };

  const navHTML = `
<div id="scrollBar"></div>
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="lsa-logo-white.png" alt="LegaXy Sports Academy" id="navLogo">
    </a>
    <button class="menu-toggle" id="menuToggle">☰</button>
    <ul class="nav-links">
      <li><a href="about.html">About</a></li>
      <li><a href="sports.html">Sports</a></li>
      <li><a href="how-it-works.html">How It Works</a></li>
      <li><a href="programs.html">Programs</a></li>
      <li><a href="athletes.html">Our Athletes</a></li>
      <li><a href="schools.html">For Schools</a></li>
      <li><a href="contact.html" class="nav-cta">Get In Touch →</a></li>
    </ul>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <button class="menu-close" id="menuClose">✕</button>
  <ul class="mobile-nav-links">
    <li><a href="about.html">About</a></li>
    <li><a href="sports.html">Sports</a></li>
    <li><a href="how-it-works.html">How It Works</a></li>
    <li><a href="programs.html">Programs</a></li>
    <li><a href="athletes.html">Our Athletes</a></li>
    <li><a href="schools.html">For Schools</a></li>
    <li><a href="contact.html" class="nav-cta">Get In Touch →</a></li>
  </ul>
</div>`;

  const footerHTML = `
<footer class="footer">
  <div class="glass-overlay"></div>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <img src="lsa-logo-white.png" alt="LegaXy Sports Academy" class="footer-logo">
        <p>Next-gen sportainment ecosystem. Spot. Train. Rise. — Building India's most modern, athlete-led school sports ecosystem.</p>
      </div>
      <div class="footer-col">
        <h5>Programs</h5>
        <a href="programs.html">In-School Program (SSEP)</a>
        <a href="programs.html">After-School Coaching</a>
        <a href="programs.html">Centre of Excellence</a>
        <a href="programs.html">Pay & Play</a>
        <a href="programs.html">Infrastructure Development</a>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <a href="about.html">About LegaXy</a>
        <a href="#">LegaXy Elite</a>
        <a href="#">LegaXy Studio</a>
        <a href="#">LegaXy Live</a>
        <a href="#">Careers</a>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <a href="mailto:hello@legaxy.org">hello@legaxy.org</a>
        <a href="https://www.legaxy.org">www.legaxy.org</a>
        <a href="demo.html">Book a Demo</a>
        <a href="Deck_LSA.pdf" download>Download Brochure</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 LegaXy Sports Academy. All rights reserved.</p>
      <p>Spot. Train. Rise.</p>
    </div>
  </div>
</footer>`;

  // Inject navbar before body content
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Highlight active nav link
  const activeIdx = NAV_MAP[path];
  if (activeIdx !== undefined) {
    const links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    if (links[activeIdx]) links[activeIdx].classList.add('active');
  }

  // ── Mobile menu toggle ──
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('open');
  });
  document.getElementById('menuClose').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
    });
  });

  // ── Scroll progress & navbar shadow ──
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    const h = document.body.scrollHeight - window.innerHeight;
    const bar = document.getElementById('scrollBar');
    if (bar) bar.style.width = (s / h * 100) + '%';
    document.getElementById('navbar').classList.toggle('scrolled', s > 60);
  });

  // ── Reveal on scroll ──
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

})();
