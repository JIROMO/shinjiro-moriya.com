const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const fitText = document.querySelector("[data-fit-text]");

if (fitText && !CSS.supports("text-fit", "grow")) {
  let lastAvailableWidth = 0;
  let resizeFrame = 0;

  const resizeFittedText = () => {
    const availableWidth = fitText.getBoundingClientRect().width;
    if (!availableWidth || Math.abs(availableWidth - lastAvailableWidth) < 0.5) return;

    lastAvailableWidth = availableWidth;

    const range = document.createRange();
    range.selectNodeContents(fitText);
    const renderedWidth = range.getBoundingClientRect().width;
    const renderedSize = Number.parseFloat(getComputedStyle(fitText).fontSize);
    if (!renderedWidth || !renderedSize) return;

    const fittedSize = (renderedSize * availableWidth) / renderedWidth;
    fitText.style.fontSize = `${fittedSize}px`;
  };

  const scheduleFittedTextResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resizeFittedText);
  };

  scheduleFittedTextResize();

  if ("ResizeObserver" in window) {
    new ResizeObserver(scheduleFittedTextResize).observe(fitText);
  } else {
    window.addEventListener("resize", scheduleFittedTextResize, { passive: true });
  }

  document.fonts?.ready.then(() => {
    lastAvailableWidth = 0;
    scheduleFittedTextResize();
  });
}

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
