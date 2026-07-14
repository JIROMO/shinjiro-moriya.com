<?php
declare(strict_types=1);

$content = json_decode(
    (string) file_get_contents(__DIR__ . '/content.json'),
    true,
    512,
    JSON_THROW_ON_ERROR,
);

require __DIR__ . '/views/_components.php';
require __DIR__ . '/views/_head.php';
require __DIR__ . '/views/_navigation.php';
require __DIR__ . '/views/home.php';
require __DIR__ . '/views/_foot.php';
