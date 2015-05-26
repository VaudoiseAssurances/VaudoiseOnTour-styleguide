'use strict';

module.exports = function(gulp, $, config, argv) {

  var pngquant = require('imagemin-pngquant');

 /**
  * Copy images
  */
  gulp.task('img-optim', function() {
    return gulp.src(config.images)
      .pipe($.imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe($.size({title: 'IMAGES'}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'Images/Placeholder'),
        gulp.dest(config.build + 'img'))
      );
  });

  /**
   * Copy svg
   */
  gulp.task('svg-optim', function() {
    return gulp.src(config.svg)
      .pipe($.imagemin({
        svgoPlugins: [{
          cleanupIDs: false // we usually need them
        }]
       }))
      .pipe($.size({title: 'SVG'}))
      .pipe($.if(argv.integration,
        gulp.dest(config.integration + 'Images/Svg'),
        gulp.dest(config.build + 'svg'))
      );
   });

   gulp.task('img', ['img-optim', 'svg-optim']);

};
