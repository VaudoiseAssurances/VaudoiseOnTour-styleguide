'use strict';

(function () {

  var initPhotoSwipeFromDOM = function (gallerySelector, galleryElementSelector) {

    var galleryElSelector = galleryElementSelector,

      parseThumbnailElements = function (el) {
        var thumbElements = el.querySelectorAll(galleryElSelector),
          numNodes = thumbElements.length,
          items = [],
          element,
          childElements,
          size,
          item;

        for (var i = 0; i < numNodes; i++) {
          element = thumbElements[i];
          // include only element nodes
          if (element.nodeType !== 1 && !element.getAttribute('data-size')) {
            continue;
          }

          size = element.getAttribute('data-size').split('x');

          // create slide object
          item = {
            src: element.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
            author: element.getAttribute('data-author')
          };

          item.el = element; // save link to element for getThumbBoundsFn

          childElements = element.children;
          if (childElements.length > 0) {
            item.msrc = childElements[0].getAttribute('src'); // thumbnail url
            if (childElements.length > 1) {
              item.title = childElements[1].innerHTML; // caption (contents of figure)
            }
          }

          var mediumSrc = element.getAttribute('data-med');
          if (mediumSrc) {
            size = element.getAttribute('data-med-size').split('x');
            // "medium-sized" image
            item.m = {
              src: mediumSrc,
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
            };
          }
          // original image
          item.o = {
            src: item.src,
            w: item.w,
            h: item.h
          };

          items.push(item);
        }

        return items;
      },

    // find nearest parent element
      closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      },

      onThumbnailsClick = function (e) {
        var event = e || window.event;
        event.returnValue = false;

        if (typeof event.preventDefault !== 'undefined') {
          event.preventDefault();
        }

        var eTarget = event.target || event.srcElement;

        var clickedListItem = closest(eTarget, function (el) {
          return el.tagName === 'A';
        });

        if (!clickedListItem) {
          return;
        }

        var clickedGallery = clickedListItem.parentNode;

        var childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

        for (var i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue;
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }

        if (index >= 0) {
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      },

      photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
          params = {};

        if (hash.length < 5) { // pid=1
          return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          var pair = vars[i].split('=');
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }

        params.gid = parseInt(params.gid, 10) || 1;

        if (!params.hasOwnProperty('pid')) {
          return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
      },

      openPhotoSwipe = function (index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          // see: http://photoswipe.com/documentation/responsive-images.html
          realViewportWidth,
          useLargeImages = false,
          firstResize = true,
          imageSrcWillChange,
          items = parseThumbnailElements(galleryElement),

          // define options (if needed)
          options = {
            index: index,
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
              // See Options->getThumbBoundsFn section of docs for more info
              var thumbnail = items[index].el.children[0],
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();

              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
            },

            addCaptionHTMLFn: function (item, captionEl) {
              if (!item.title) {
                captionEl.children[0].innerText = '';
                return false;
              }
              captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
              return true;
            },

            getPageURLForShare: function() {
              var item = items[this.index ],
                pageUrl = window.location.href;

              if (item === undefined) {
                return pageUrl;
              }

              return item.el.getAttribute('data-sharing-url') || pageUrl;
            }
          };

        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        /* global PhotoSwipe, PhotoSwipeUI_Default */
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.listen('beforeResize', function () {

          var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
          dpiRatio = Math.min(dpiRatio, 2.5);
          realViewportWidth = gallery.viewportSize.x * dpiRatio;

          if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
            if (!useLargeImages) {
              useLargeImages = true;
              imageSrcWillChange = true;
            }

          } else {
            if (useLargeImages) {
              useLargeImages = false;
              imageSrcWillChange = true;
            }
          }

          if (imageSrcWillChange && !firstResize) {
            gallery.invalidateCurrItems();
          }

          if (firstResize) {
            firstResize = false;
          }

          imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (index, item) {
          if (useLargeImages) {
            item.src = item.o.src;
            item.w = item.o.w;
            item.h = item.o.h;
          } else {
            item.src = item.m.src;
            item.w = item.m.w;
            item.h = item.m.h;
          }
        });

        gallery.init();
      };

    // select all gallery elements
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid > 0 && hashData.gid > 0) {
      openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
    }
  };

  initPhotoSwipeFromDOM('.gallery', '.demo-gallery__img--main');

})();
