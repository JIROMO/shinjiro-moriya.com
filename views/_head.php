<!doctype html>
<html lang="ja" data-theme="portfolio">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= e($content['site']['title']) ?></title>
    <meta name="description" content="<?= e($content['site']['description']) ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="Shinjiro Moriya" />
    <meta property="og:title" content="<?= e($content['site']['title']) ?>" />
    <meta property="og:description" content="<?= e($content['site']['og_description']) ?>" />
    <meta property="og:url" content="<?= e($content['site']['url']) ?>" />
    <meta property="og:image" content="<?= e($content['site']['og_image']) ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Shinjiro Moriya — Designing conditions for creation." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?= e($content['site']['title']) ?>" />
    <meta name="twitter:description" content="<?= e($content['site']['og_description']) ?>" />
    <meta name="twitter:image" content="<?= e($content['site']['og_image']) ?>" />
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
