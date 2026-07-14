    <main class="portfolio-view">
      <?php viewHero($content, 'portfolio'); ?>
      <?php viewMarquee($content['marquee']); ?>

      <div class="portfolio-view__introduction">
        <?php viewBeginning($content['beginning']); ?>
        <?php viewSoftware($content['software']); ?>
      </div>

      <div class="portfolio-view__catalog">
        <?php viewConditions($content['conditions']); ?>
        <?php viewModular($content['modular']); ?>
      </div>

      <div class="portfolio-view__studio">
        <?php viewCompany($content['company']); ?>
        <?php viewPhilosophy($content['philosophy']); ?>
      </div>

      <div class="portfolio-view__archive">
        <?php viewTimeline($content['timeline']); ?>
        <?php viewJournal($content['journal']); ?>
      </div>

      <?php viewManifesto($content['manifesto']); ?>
    </main>
