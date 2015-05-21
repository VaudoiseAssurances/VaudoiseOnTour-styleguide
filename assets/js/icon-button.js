'use strict';

(function($){
  $(document).ready(function(){
    $('.icon-button, .thumbnail-cover a, .thumbnail').mouseenter(function(){
      var $that = $(this),
          widthAuto = $that.find('.button-label').width();

      $that.find('.button-label-wrapper').animate({width: widthAuto + 50}, 150);
      $that.find('.button-label').animate({opacity: 1}, 300);
    });

    $('.icon-button').mouseleave(function(){
      var $that = $(this),
          halfDisc = $(this).width() / 2;

      $that.find('.button-label').animate({opacity: 0}, 150, function(){
        $that.find('.button-label-wrapper').animate({width: halfDisc}, 150);
      });
    });

    $('.thumbnail-cover a, .thumbnail').mouseleave(function(){
      var $that = $(this),
          halfDisc = $(this).find('.icon-button').width() / 2;

      $that.find('.button-label').animate({opacity: 0}, 150, function(){
        $that.find('.button-label-wrapper').animate({width: halfDisc}, 150);
      });
    });
  });
}(jQuery));