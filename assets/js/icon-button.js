'use strict';

(function($){
  $(document).ready(function(){
    $('.icon-button').mouseenter(function(){
      var $that = $(this),
          widthAuto = $that.find('.button-label').width(),
          halfDisc = $that.width() / 2;

      $that.find('.button-label-wrapper').animate({width: widthAuto + 50}, 150, function(){
        $that.find('.button-label').animate({opacity: 1}, 150);
      });
    });

    $('.icon-button').mouseleave(function(){
      var $that = $(this),
          halfDisc = $(this).width() / 2;

      $that.find('.button-label').animate({opacity: 0}, 150, function(){
        $that.find('.button-label-wrapper').animate({width: halfDisc}, 150);
      });
    });
  });
}(jQuery));