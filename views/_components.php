<?php
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function viewHero(array $content, string $variant): void
{
    $hero = $content['hero'];
    ?>
    <header class="hero hero--<?= e($variant) ?>" aria-labelledby="hero-title">
      <div class="site-mark" aria-label="Shinjiro Moriya">SM</div>
      <div class="color-rail" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="kinetic-field" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="hero-grid" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <?php if ($variant === 'tue'): ?>
        <div class="poster-code">TUE / 02 / TOKYO</div>
        <h1 id="hero-title"><?php foreach (explode(' ', $hero['title']) as $word): ?><span><?= e($word) ?></span><?php endforeach; ?></h1>
        <p class="kicker"><?= e($hero['kicker']) ?></p>
      <?php elseif ($variant === 'thu'): ?>
        <div class="field-label"><span>FIELD NOTE</span><b>04</b></div>
        <div class="hero-title-block"><p class="kicker"><?= e($hero['kicker']) ?></p><h1 id="hero-title"><?= e($hero['title']) ?></h1></div>
      <?php elseif ($variant === 'fri'): ?>
        <div class="night-status"><i></i> ONLINE / TOKYO / FRI</div>
        <h1 id="hero-title"><?= e($hero['title']) ?></h1>
        <p class="kicker"><?= e($hero['kicker']) ?></p>
      <?php elseif ($variant === 'sun'): ?>
        <p class="kicker">Sunday edition — <?= e($hero['kicker']) ?></p>
        <h1 id="hero-title"><?= e($hero['title']) ?></h1>
      <?php else: ?>
        <p class="kicker"><?= e($hero['kicker']) ?></p>
        <h1 id="hero-title"><?= e($hero['title']) ?></h1>
      <?php endif; ?>
      <div class="role-reel" aria-label="Developer, Designer, Founder, Maker">
        <?php foreach ($hero['roles'] as $role): ?><span><?= e($role) ?></span><?php endforeach; ?>
      </div>
      <p class="hero-statement"><?= e($hero['statement']) ?></p>
      <p class="hero-copy"><?= e($hero['copy']) ?></p>
      <div class="hero-index" aria-hidden="true">
        <?php foreach ($hero['index'] as $item): ?><span><?= e($item) ?></span><?php endforeach; ?>
      </div>
    </header>
    <?php
}

function viewMarquee(array $items): void
{
    ?><div class="marquee" aria-hidden="true"><div><?php for ($r = 0; $r < 2; $r++): foreach ($items as $item): ?><span><?= e($item) ?></span><?php endforeach; endfor; ?></div></div><?php
}

function viewBeginning(array $data): void
{
    ?>
    <section class="chapter beginning" aria-labelledby="beginning-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="beginning-title"><?= e($data['title']) ?></h2>
      <div class="split"><p class="lead"><?= e($data['lead']) ?></p><div class="text-stack"><?php foreach ($data['body'] as $p): ?><p><?= e($p) ?></p><?php endforeach; ?></div></div>
      <blockquote><?= e($data['quote']) ?></blockquote>
    </section>
    <?php
}

function viewSoftware(array $data): void
{
    ?>
    <section class="chapter software" aria-labelledby="software-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="software-title"><?= e($data['title']) ?></h2>
      <div class="orbit" aria-label="Fields Shinjiro Moriya has explored"><?php foreach ($data['fields'] as $field): ?><span><?= e($field) ?></span><?php endforeach; ?></div>
      <p class="section-note"><?= e($data['note']) ?></p>
    </section>
    <?php
}

function viewModular(array $data): void
{
    ?>
    <section class="chapter modular" aria-labelledby="modular-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="modular-title"><?= e($data['title']) ?></h2>
      <p class="modular-intro"><?= implode('<br />', array_map('e', $data['lead'])) ?></p>
      <div class="scale-map" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="module-ladder"><?php foreach ($data['modules'] as $module): ?><div class="module-card"><span><?= e($module['type']) ?></span><strong><?= e($module['name']) ?></strong><p><?= e($module['description']) ?></p></div><?php endforeach; ?></div>
      <p class="maxim"><?= e($data['maxim'][0]) ?><br /><?= e($data['maxim'][1]) ?></p>
    </section>
    <?php
}

function viewConditions(array $data): void
{
    ?>
    <section class="chapter conditions" aria-labelledby="conditions-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="conditions-title"><?= e($data['title']) ?></h2><p class="lead narrow"><?= e($data['lead']) ?></p>
      <div class="project-grid"><?php foreach ($data['projects'] as $project): ?><article class="project"><p><?= e($project['type']) ?></p><h3><?= e($project['name']) ?></h3><span><?= e($project['description']) ?></span></article><?php endforeach; ?></div>
    </section>
    <?php
}

function viewCompany(array $data): void
{
    ?>
    <section class="chapter company" aria-labelledby="company-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="company-title"><?= e($data['title']) ?></h2>
      <div class="company-panel"><div><p class="company-kicker"><?= e($data['kicker']) ?></p><p class="company-lead"><?= e($data['lead']) ?></p></div><dl class="company-facts" aria-label="JIROMO company facts"><?php foreach ($data['facts'] as $fact): ?><div><dt><?= e($fact['label']) ?></dt><dd><?= e($fact['value']) ?></dd></div><?php endforeach; ?></dl></div>
      <div class="work-list">
        <?php foreach ($data['works'] as $work): $url = trim((string) ($work['url'] ?? '')); ?>
          <article<?= $url !== '' ? ' class="has-link"' : '' ?>>
            <?php if ($url !== ''): ?><a class="work-card__link" href="<?= e($url) ?>"><?php endif; ?>
              <h3><?= e($work['name']) ?></h3><p><?= e($work['description']) ?></p>
            <?php if ($url !== ''): ?></a><?php endif; ?>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
    <?php
}

function viewPhilosophy(array $data): void
{
    ?>
    <section class="chapter philosophy" aria-labelledby="philosophy-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="philosophy-title"><?= e($data['title']) ?></h2>
      <div class="declarations"><?php foreach ($data['declarations'] as $declaration): ?><article><h3><?= e($declaration['title']) ?></h3><p><?= e($declaration['body']) ?></p></article><?php endforeach; ?></div>
    </section>
    <?php
}

function viewTimeline(array $data): void
{
    ?>
    <section class="chapter timeline" aria-labelledby="timeline-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="timeline-title"><?= e($data['title']) ?></h2>
      <div class="timeline-list"><?php foreach ($data['items'] as $item): ?><article><span><?= e($item['number']) ?></span><h3><?= e($item['title']) ?></h3><p><?= e($item['body']) ?></p></article><?php endforeach; ?></div>
    </section>
    <?php
}

function viewJournal(array $data): void
{
    ?>
    <section class="chapter journal" aria-labelledby="journal-title">
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="journal-title"><?= e($data['title']) ?></h2>
      <div class="thought-grid"><?php foreach ($data['thoughts'] as $thought): ?><article class="thought"><p><?= e($thought['number']) ?></p><h3><?= e($thought['title']) ?></h3><span><?= e($thought['body']) ?></span></article><?php endforeach; ?></div>
    </section>
    <?php
}

function viewManifesto(array $data): void
{
    ?>
    <section class="manifesto" aria-labelledby="manifesto-title">
      <div class="manifesto-grid" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <p class="chapter-number"><?= e($data['number']) ?></p><h2 id="manifesto-title"><?= e($data['title']) ?></h2>
      <p><?= implode('<br />', array_map('e', $data['lines'])) ?></p>
      <footer><strong><?= e($data['name']) ?></strong><a href="<?= e($data['contact_url']) ?>" target="_blank" rel="noopener noreferrer"><?= e($data['contact_label']) ?></a></footer>
    </section>
    <?php
}
