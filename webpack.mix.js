let mix = require('laravel-mix');

mix.js('assets/js/app.js', 'public/js/')
    .js('assets/js/renderer.js', 'public/js/')
    .sass('assets/sass/app.scss', 'public/css/')
    // .sass('assets/sass/sniddl-mobile.scss', 'public/css/')
