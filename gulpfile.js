'use strict';
/**
 * Import plugins
 */
var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')(),
    config        = require('./gulp_config.json'),
    assemble      = require('fabricator-assemble'),
    browserSync   = require('browser-sync'),
    runSequence   = require('run-sequence'),
    argv          = require('yargs').argv,
    del           = require('del'),
    slug          = require('slug');


require(config.tasks + 'vendors')(gulp, $, config, argv);                      // $ gulp vendors
require(config.tasks + 'images')(gulp, $, config, argv);                       // $ gulp img
require(config.tasks + 'styles')(gulp, $, config, argv, slug);                 // $ gulp styles
require(config.tasks + 'scripts')(gulp, $, config, argv);                      // $ gulp scripts
require(config.tasks + 'icons')(gulp, $, config, argv, slug);                  // $ gulp icons
require(config.tasks + 'clean')(gulp, $, config, del);                         // $ gulp clean
require(config.tasks + 'styleguide')(gulp, $, config, assemble);               // $ gulp styleguide
require(config.tasks + 'server')(gulp, $, config, browserSync, runSequence);   // $ gulp serve
require(config.tasks + 'gh-pages')(gulp, $, config);                           // $ gulp deploy


/**
 * Init project
 */
gulp.task('init', function() {
  return gulp.src('bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss')
    .pipe($.rename('bootstrap-variables.scss'))
    .pipe(gulp.dest('assets/sass'));
});


/**
 * Task to build assets on production server
 */
gulp.task('build',['clean'], function() {
  return gulp.start('vendors', 'styles', 'img', 'scripts');
});


/**
 * Default task
 */
gulp.task('default', ['clean'], function(done){
  runSequence(['css-vendors', 'js-vendors', 'fonts-vendors', 'polyfills-vendors', 'img', 'icons', 'styles', 'scripts', 'styleguide-styles', 'styleguide-scripts'], 'styleguide', done);
});
