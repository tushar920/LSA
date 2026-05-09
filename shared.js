/* ══════════════════════════════════════════════
   LegaXy Sports Academy — Shared Components
   ══════════════════════════════════════════════ */

(function() {

  const path = window.location.pathname.split('/').pop() || 'index.html';

  const NAV_MAP = {
    'sports.html':       0,
    'how-it-works.html': 1,
    'programs.html':     2,
    'athletes.html':     3,
    'schools.html':      4,
    'gallery.html':      5,
    'partnerships.html': 6,
    'contact.html':      7,
    'demo.html':         7
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
      <li><a href="sports.html">Sports</a></li>
      <li><a href="how-it-works.html">How It Works</a></li>
      <li class="nav-dropdown">
        <a href="programs.html" class="nav-dropdown-trigger">Programs <span class="nav-arrow">▾</span></a>
        <ul class="nav-dropdown-menu">
          <li><a href="programs.html#ssep">In-School Programs</a></li>
          <li><a href="programs.html#afterschool">After-School Programs</a></li>
          <li><a href="programs.html#coe">Centers of Excellence</a></li>
          <li><a href="programs.html#infra">Infrastructure & Consulting</a></li>
        </ul>
      </li>
      <li><a href="athletes.html">Our Athletes</a></li>
      <li><a href="schools.html">For Schools</a></li>
      <li><a href="gallery.html">Gallery</a></li>
      <li><a href="partnerships.html">Partnerships</a></li>
      <li><a href="contact.html" class="nav-cta">Partner With Us →</a></li>
    </ul>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <button class="menu-close" id="menuClose">✕</button>
  <ul class="mobile-nav-links">
    <li><a href="sports.html">Sports</a></li>
    <li><a href="how-it-works.html">How It Works</a></li>
    <li><a href="programs.html">Programs</a></li>
    <li><a href="athletes.html">Our Athletes</a></li>
    <li><a href="schools.html">For Schools</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="partnerships.html">Partnerships</a></li>
    <li><a href="contact.html" class="nav-cta">Partner With Us →</a></li>
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
        <a href="programs.html">Pay &amp; Play</a>
        <a href="programs.html">Infrastructure Development</a>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <a href="partnerships.html">Partnerships</a>
        <a href="gallery.html">Gallery</a>
        <a href="#">LegaXy Elite</a>
        <a href="#">LegaXy Studio</a>
        <a href="#">Careers</a>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <a href="mailto:hello@legaxy.org">hello@legaxy.org</a>
        <a href="contact.html">Partner With Us</a>
        <a href="Deck_LSA.pdf" download>Download Brochure</a>
        <div class="footer-contacts">
          <div class="footer-contact-row">
            <span class="footer-contact-name">Tushar Bhaskar</span>
            <a href="mailto:tushar@legaxy.org">tushar@legaxy.org</a>
          </div>
          <div class="footer-contact-row">
            <span class="footer-contact-name">Srisha Bhalle</span>
            <a href="mailto:srisha@legaxy.org">srisha@legaxy.org</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LegaXy Sports Academy. All rights reserved.</p>
      <p>Spot. Train. Rise.</p>
    </div>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── Active nav highlight ──
  const activeIdx = NAV_MAP[path];
  if (activeIdx !== undefined) {
    const links = document.querySelectorAll('.nav-links > li > a:not(.nav-cta)');
    if (links[activeIdx]) links[activeIdx].classList.add('active');
  }
  if (path === 'programs.html') {
    const dt = document.querySelector('.nav-dropdown-trigger');
    if (dt) dt.classList.add('active');
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

  // ── Programs dropdown ──
  const dropdownLi = document.querySelector('.nav-dropdown');
  if (dropdownLi) {
    dropdownLi.addEventListener('mouseenter', () => dropdownLi.classList.add('open'));
    dropdownLi.addEventListener('mouseleave', () => dropdownLi.classList.remove('open'));
  }

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
