const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches) {
  const selectors = [
    ".chapter-number",
    ".chapter h2",
    ".chapter .lead",
    ".chapter .text-stack",
    ".chapter blockquote",
    ".module-card",
    ".project",
    ".company-panel",
    ".work-list article",
    ".declarations article",
    ".timeline-list article",
    ".thought",
    ".manifesto h2",
    ".manifesto > p",
    ".manifesto footer",
  ];

  const revealItems = [];

  document.querySelectorAll("section").forEach((section) => {
    section.querySelectorAll(selectors.join(",")).forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
      revealItems.push(item);
    });
  });

  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -7% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}
