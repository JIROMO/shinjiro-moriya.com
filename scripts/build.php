<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$outputDirectory = $root . '/dist';

if (!is_dir($outputDirectory) && !mkdir($outputDirectory, 0775, true) && !is_dir($outputDirectory)) {
    throw new RuntimeException('Unable to create the dist directory.');
}

ob_start();
require $root . '/index.php';
$html = ob_get_clean();

if ($html === false || file_put_contents($outputDirectory . '/index.html', $html) === false) {
    throw new RuntimeException('Unable to generate dist/index.html.');
}

$assets = [
    'favicon.png',
    'motion.js',
    'og-image.png',
    'style.css',
];

foreach ($assets as $asset) {
    if (!copy($root . '/' . $asset, $outputDirectory . '/' . $asset)) {
        throw new RuntimeException(sprintf('Unable to copy %s.', $asset));
    }
}

fwrite(STDOUT, "Built Cloudflare assets in dist/.\n");
