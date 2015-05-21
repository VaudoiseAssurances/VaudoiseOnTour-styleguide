'use strict';

(function($){
  $(document).ready(function(){
    $('.icon-button, .thumbnail-cover a, .thumbnail, .table-hover tr').mouseenter(function(){
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

    $('.thumbnail-cover a, .thumbnail, .table-hover tr').mouseleave(function(){
      var $that = $(this),
          halfDisc = $(this).find('.icon-button').width() / 2;

      $that.find('.button-label').animate({opacity: 0}, 150, function(){
        $that.find('.button-label-wrapper').animate({width: halfDisc}, 150);
      });
    });
  });
}(jQuery));
'use strict';

(function ($) {
  $(document).ready(function(){
    $('.focuspoint').focusPoint();
  });
}(jQuery));
'use strict';

(function(){

}());

'use strict';

(function($){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}(jQuery));