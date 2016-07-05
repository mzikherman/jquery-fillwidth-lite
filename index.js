// Generated by CoffeeScript 1.10.0
(function() {
  var $, _, defaultApply, fillwidth, imagesLoaded, jqueryFillwidthLite;

  $ = (typeof window !== "undefined" && window !== null ? window.$ : void 0) || null;

  _ = (typeof window !== "undefined" && window !== null ? window._ : void 0) || null;

  imagesLoaded = (typeof window !== "undefined" && window !== null ? window.imagesLoaded : void 0) || null;

  jqueryFillwidthLite = function(a, b, c) {
    $ || ($ = a);
    _ || (_ = b);
    imagesLoaded || (imagesLoaded = c);
    return $.fn.fillwidthLite = function(options) {
      if (options == null) {
        options = {};
      }
      return fillwidth($(this), options.targetHeight || 500, options.done || function() {}, options.apply || defaultApply, options.gutterSize || 0, options.resizeUp || true);
    };
  };

  defaultApply = function(img) {
    return img.$el.width(img.width);
  };

  fillwidth = function($list, targetHeight, done, apply, gutterSize, resizeUp) {
    var $imgs;
    $imgs = $list.find('img');
    return imagesLoaded($list[0], (function(_this) {
      return function() {
        var dir, i, imagesWidth, img, imgs, imgsWidth, j, k, l, len, len1, len2, len3, len4, o, p, q, r, resizeHeight, totalWhitespace, widthDiff;
        imgs = $imgs.map(function() {
          return {
            width: $(this).width(),
            height: $(this).height(),
            $el: $(this)
          };
        }).toArray();
        imgsWidth = function() {
          return _.reduce(_.map(imgs, function(i) {
            return i.width;
          }), function(m, n) {
            return m + n;
          });
        };
        widthDiff = function() {
          return Math.abs($list.width() - imgsWidth());
        };
        resizeHeight = function(img, dir) {
          img.width += (img.width / img.height) * dir;
          return img.height += dir;
        };
        for (j = 0, len = imgs.length; j < len; j++) {
          img = imgs[j];
          img.width = img.width * (targetHeight / img.height);
          img.height = targetHeight;
        }
        imagesWidth = imgsWidth();
        if (imagesWidth <= $list.width() && !resizeUp) {
          return done(imgs);
        }
        dir = imagesWidth > $list.width() ? -1 : 1;
        for (i = k = 0; k <= 999; i = ++k) {
          for (l = 0, len1 = imgs.length; l < len1; l++) {
            img = imgs[l];
            resizeHeight(img, dir);
            if (widthDiff() < 1) {
              break;
            }
          }
          if (widthDiff() < 1) {
            break;
          }
        }
        totalWhitespace = imgs.length * gutterSize;
        for (i = o = 0; o <= 999; i = ++o) {
          for (p = 0, len2 = imgs.length; p < len2; p++) {
            img = imgs[p];
            resizeHeight(img, -1);
            if (imgsWidth() <= $list.width() - totalWhitespace) {
              break;
            }
          }
          if (imgsWidth() <= $list.width() - totalWhitespace) {
            break;
          }
        }
        for (q = 0, len3 = imgs.length; q < len3; q++) {
          img = imgs[q];
          img.width = Math.floor(img.width);
          img.height = Math.floor(img.height);
          if (widthDiff() === 0) {
            break;
          }
        }
        for (i = r = 0, len4 = imgs.length; r < len4; i = ++r) {
          img = imgs[i];
          apply(img, i, gutterSize);
        }
        return done(imgs);
      };
    })(this));
  };

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = jqueryFillwidthLite;
  } else {
    if (typeof window !== "undefined" && window !== null) {
      window.jqueryFillwidthLite = jqueryFillwidthLite;
    }
  }

}).call(this);
