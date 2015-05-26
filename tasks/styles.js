'use strict';

module.exports = function(gulp, $, config, argv, slug) {

  var iconFontName = slug(config.iconsFontName).toLowerCase();

  /**
   * Build styles from SCSS files
   * With error reporting on compiling (so that there's no crash)
   */
  gulp.task('styles', function() {
    if (argv.production) { console.log('[styles] Production mode' ); }
    else { console.log('[styles] Dev mode'); }

    return gulp.src([config.assets + 'sass/' + iconFontName + '.scss', config.assets + 'sass/main.scss'])
      .pipe($.if(!argv.production, $.sourcemaps.init()))
      .pipe($.sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        errLogToConsole: true
      }))
      .pipe($.postcss([
        require('autoprefixer-core')({
          browsers: config.browsers,
          options: {
            map: true
          }
        })
      ]))
      .pipe($.if(!argv.production, $.sourcemaps.write()))
      .pipe($.concat('main.css'))
      .pipe($.size({title: 'STYLES', showFiles: true}))
      .pipe($.if(argv.production, $.minifyCss()))
      .pipe($.if(argv.production, $.rename({suffix: '.min'})))
      // use --production --integration to deploy assets in Public directory
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + '/StylesSheet'),
        gulp.dest(config.build + '/css'))
      );
  });

};
