let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js/app.js').sass('resources/scss/app.scss','public/css/app.css');
// mix.browserSync('127.0.0.1:8000');