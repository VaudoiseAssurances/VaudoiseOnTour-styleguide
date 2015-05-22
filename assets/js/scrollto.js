'use strict';

(function($){
  $(document).ready(function(){
    $('.btn[href*="#"]').click(function(e){
      e.preventDefault();
      var $target = $(this).attr('href');
      $('html, body').animate({
          scrollTop: $($target).offset().top -30
      }, 1000);
    });
  });
}(jQuery));