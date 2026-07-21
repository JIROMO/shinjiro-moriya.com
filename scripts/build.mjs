import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(root, "dist");
const content = JSON.parse(await readFile(join(root, "content.json"), "utf8"));

const e = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const renderHero = (hero) => `
    <header class="hero hero--portfolio" aria-labelledby="hero-title">
      <div class="site-mark" aria-label="Shinjiro Moriya">SM</div>
      <div class="color-rail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="kinetic-field" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="hero-grid" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <p class="kicker">${e(hero.kicker)}</p>
      <h1 id="hero-title">${e(hero.title)}</h1>
      <div class="role-reel" aria-label="Developer, Designer, Founder, Maker">
        ${hero.roles.map((role) => `<span>${e(role)}</span>`).join("")}
      </div>
      <p class="hero-statement">${e(hero.statement)}</p>
      <p class="hero-copy">${e(hero.copy)}</p>
      <div class="hero-index" aria-hidden="true">
        ${hero.index.map((item) => `<span>${e(item)}</span>`).join("")}
      </div>
    </header>`;

const renderMarquee = (items) => `<div class="marquee" aria-hidden="true"><div>${[...items, ...items].map((item) => `<span>${e(item)}</span>`).join("")}</div></div>`;

const renderBeginning = (data) => `
    <section class="chapter beginning" aria-labelledby="beginning-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="beginning-title">${e(data.title)}</h2>
      <div class="split"><p class="lead">${e(data.lead)}</p><div class="text-stack">${data.body.map((paragraph) => `<p>${e(paragraph)}</p>`).join("")}</div></div>
      <blockquote>${e(data.quote)}</blockquote>
    </section>`;

const renderSoftware = (data) => `
    <section class="chapter software" aria-labelledby="software-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="software-title">${e(data.title)}</h2>
      <div class="orbit" aria-label="Fields Shinjiro Moriya has explored">${data.fields.map((field) => `<span>${e(field)}</span>`).join("")}</div>
      <p class="section-note">${e(data.note)}</p>
    </section>`;

const renderConditions = (data) => `
    <section class="chapter conditions" aria-labelledby="conditions-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="conditions-title">${e(data.title)}</h2><p class="lead narrow">${e(data.lead)}</p>
      <div class="project-grid">${data.projects.map((project) => `<article class="project"><p>${e(project.type)}</p><h3>${e(project.name)}</h3><span>${e(project.description)}</span></article>`).join("")}</div>
    </section>`;

const renderModular = (data) => `
    <section class="chapter modular" aria-labelledby="modular-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="modular-title">${e(data.title)}</h2>
      <p class="modular-intro">${data.lead.map(e).join("<br />")}</p>
      <div class="scale-map" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="module-ladder">${data.modules.map((module) => `<div class="module-card"><span>${e(module.type)}</span><strong>${e(module.name)}</strong><p>${e(module.description)}</p></div>`).join("")}</div>
      <p class="maxim">${e(data.maxim[0])}<br />${e(data.maxim[1])}</p>
    </section>`;

const renderCompany = (data) => `
    <section class="chapter company" aria-labelledby="company-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="company-title">${e(data.title)}</h2>
      <div class="company-panel"><div><p class="company-kicker">${e(data.kicker)}</p><p class="company-lead">${e(data.lead)}</p></div><dl class="company-facts" aria-label="JIROMO company facts">${data.facts.map((fact) => `<div><dt>${e(fact.label)}</dt><dd>${e(fact.value)}</dd></div>`).join("")}</dl></div>
      <div class="work-list">${data.works.map((work) => {
        const url = String(work.url ?? "").trim();
        const body = `<h3>${e(work.name)}</h3><p>${e(work.description)}</p>`;
        return `<article${url ? ' class="has-link"' : ""}>${url ? `<a class="work-card__link" href="${e(url)}">${body}</a>` : body}</article>`;
      }).join("")}</div>
    </section>`;

const renderPhilosophy = (data) => `
    <section class="chapter philosophy" aria-labelledby="philosophy-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="philosophy-title">${e(data.title)}</h2>
      <div class="declarations">${data.declarations.map((item) => `<article><h3>${e(item.title)}</h3><p>${e(item.body)}</p></article>`).join("")}</div>
    </section>`;

const renderTimeline = (data) => `
    <section class="chapter timeline" aria-labelledby="timeline-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="timeline-title">${e(data.title)}</h2>
      <div class="timeline-list">${data.items.map((item) => `<article><span>${e(item.number)}</span><h3>${e(item.title)}</h3><p>${e(item.body)}</p></article>`).join("")}</div>
    </section>`;

const renderJournal = (data) => `
    <section class="chapter journal" aria-labelledby="journal-title">
      <p class="chapter-number">${e(data.number)}</p><h2 id="journal-title">${e(data.title)}</h2>
      <div class="thought-grid">${data.thoughts.map((thought) => `<article class="thought"><p>${e(thought.number)}</p><h3>${e(thought.title)}</h3><span>${e(thought.body)}</span></article>`).join("")}</div>
    </section>`;

const renderManifesto = (data) => `
    <section class="manifesto" aria-labelledby="manifesto-title">
      <div class="manifesto-grid" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <p class="chapter-number">${e(data.number)}</p><h2 id="manifesto-title">${e(data.title)}</h2>
      <p>${data.lines.map(e).join("<br />")}</p>
      <footer><strong>${e(data.name)}</strong><a href="${e(data.contact_url)}" target="_blank" rel="noopener noreferrer">${e(data.contact_label)}</a></footer>
    </section>`;

const html = `<!doctype html>
<html lang="ja" data-theme="portfolio">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${e(content.site.title)}</title>
    <meta name="description" content="${e(content.site.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="Shinjiro Moriya" />
    <meta property="og:title" content="${e(content.site.title)}" />
    <meta property="og:description" content="${e(content.site.og_description)}" />
    <meta property="og:url" content="${e(content.site.url)}" />
    <meta property="og:image" content="${e(content.site.og_image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Shinjiro Moriya — Designing conditions for creation." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(content.site.title)}" />
    <meta name="twitter:description" content="${e(content.site.og_description)}" />
    <meta name="twitter:image" content="${e(content.site.og_image)}" />
    <link rel="icon" href="favicon.png" />
    <link rel="stylesheet" href="style.css" />
    <script src="motion.js" defer></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3P4E9305L4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag("js", new Date());
      gtag("config", "G-3P4E9305L4");
    </script>
  </head>
  <body class="view-portfolio">
    <header class="site-masthead">
      <div class="site-masthead__top">
        <p class="site-masthead__place">SHINJIRO MORIYA / TOKYO</p>
        <nav class="site-masthead__nav" aria-label="Primary navigation">
          <a href="#conditions-title">Projects</a><a href="#company-title">Company</a><a href="#philosophy-title">Ideas</a><a href="#manifesto-title">Manifesto</a>
        </nav>
        <a class="masthead-contact" href="${e(content.manifesto.contact_url)}" target="_blank" rel="noopener noreferrer">${e(content.manifesto.contact_label)}<span aria-hidden="true">↗</span></a>
      </div>
      <div class="site-masthead__name" data-fit-text aria-hidden="true">SHIN<span>JIROMO</span>RIYA</div>
    </header>
    <main class="portfolio-view">
      ${renderHero(content.hero)}
      ${renderMarquee(content.marquee)}
      <div class="portfolio-view__introduction">${renderBeginning(content.beginning)}${renderSoftware(content.software)}</div>
      <div class="portfolio-view__catalog">${renderConditions(content.conditions)}${renderModular(content.modular)}</div>
      <div class="portfolio-view__studio">${renderCompany(content.company)}${renderPhilosophy(content.philosophy)}</div>
      <div class="portfolio-view__archive">${renderTimeline(content.timeline)}${renderJournal(content.journal)}</div>
      ${renderManifesto(content.manifesto)}
    </main>
  </body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, "index.html"), html);
await Promise.all(["favicon.png", "motion.js", "og-image.png", "style.css"].map((asset) => (
  copyFile(join(root, asset), join(outputDirectory, asset))
)));

console.log("Built Cloudflare assets in dist/.");
