'use strict';

module.exports = function(gulp, $, config, argv) {

 /*
  * CSS Vendors
  */
  gulp.task('css-vendors', function() {
    return gulp.src(config.vendors.css)
      .pipe($.concat('vendors.min.css'))
      .pipe($.minifyCss())
      .pipe($.size({title: 'CSS VENDORS', showFiles: true}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'StylesSheet/Vendors'),
        gulp.dest(config.build + 'css'))
      );
  });

 /*
  * JS Vendors
  */
  gulp.task('js-vendors', function() {
    return gulp.src(config.vendors.js)
      .pipe($.concat('vendors.min.js'))
      .pipe($.uglify())
      .pipe($.size({title: 'JS VENDORS', showFiles: true}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'JavaScript'),
        gulp.dest(config.build + 'js'))
      );
  });

 /*
  * Fonts Sources
  */
  gulp.task('fonts-vendors', function() {
    return gulp.src(config.vendors.fonts)
      .pipe($.size({title: 'FONTS'}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'fonts'),
        gulp.dest(config.build + 'fonts'))
      );
  });

 /*
  * Polyfills Sources
  */
  gulp.task('polyfills-vendors', function() {
    return gulp.src(config.vendors.polyfills)
      .pipe($.concat('polyfills.min.js'))
      .pipe($.uglify())
      .pipe($.size({title: 'POLYFILLS', showFiles: true}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'JavaScript'),
        gulp.dest(config.build + 'js'))
      );
  });

  /*
  * Build vendors dependencies
  */
  gulp.task('vendors', function() {
    return gulp.start('css-vendors', 'js-vendors', 'fonts-vendors', 'polyfills-vendors');
  });

};
