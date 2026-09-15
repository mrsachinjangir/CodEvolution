document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("active");
      menuButton.classList.toggle("active", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Smooth scrolling with fixed-header offset.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  // Reveal sections/cards as they enter the viewport.
  const revealItems = document.querySelectorAll(
    ".service-card, .tech-item, .portfolio-item, .member-card, .hero-content, .section-kicker, .section-description"
  );
  revealItems.forEach(el => el.classList.add("fade-in"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

  // Highlight the current navigation item.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navAnchors = [...document.querySelectorAll(".nav-links a")];
  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 130;
    let current = "home";
    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) current = section.id;
    });
    navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // Contact form demo feedback.
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thanks for reaching out! We’ll get back to you soon.");
      contactForm.reset();
    });
  }

  // Newsletter demo feedback.
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thanks for subscribing!");
      newsletterForm.reset();
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});
