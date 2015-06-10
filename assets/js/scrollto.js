'use strict';

(function($) {
  $(document).ready(function() {
    var $scrollToTargetOnLoad = $('#offsetOnLoad'),
    scrollTo = function($target, delay) {
      $('html, body').animate({
        scrollTop : $($target).offset().top - 30
      }, delay);
    };

    $('.btn[href*="#"]').click(function(e) {
      e.preventDefault();
      var $target = $(this).attr('href');
      scrollTo($target, 1000);
    });

    if ($scrollToTargetOnLoad.length) {
      scrollTo($scrollToTargetOnLoad, 1200);
    }
  });
}(jQuery));