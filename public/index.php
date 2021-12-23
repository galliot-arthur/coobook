<?php

use App\Kernel;

//header("Content-Security-Policy: default-src 'self' '; script-src 'self' ; style-src 'self' 'unsafe-eval'; ");

require_once dirname(__DIR__) . '/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
