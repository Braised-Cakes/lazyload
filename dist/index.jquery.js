'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.LazyLoad = factory();
})(window, function () {
	return function () {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		var s = this;
		var defaults = {
			lazyLoadingClass: 'lazy-image',
			lazyStatusLoadingClass: 'lazy-loading',
			lazyStatusLoadedClass: 'lazy-loaded'
		};
		for (var attr in defaults) {
			if (typeof params[attr] === 'undefined') {
				params[attr] = defaults[attr];
			}
		}
		s.params = params;
		var clientHeight = $(window).height();

		function mainLogic() {
			var scrollTop = $(window).scrollTop();
			$('.' + s.params.lazyLoadingClass).each(function (index, item) {
				if (scrollTop + clientHeight > $(item).offset().top && $(item).offset().top + $(item).height() > scrollTop) {
					$(item).removeClass(s.params.lazyLoadingClass).addClass(s.params.lazyStatusLoadingClass);
					s.loadImage(item);
				}
			});
		}
		s.loadImage = function (item) {
			var img = new Image();
			img.src = $(item).attr('data-src');
			img.onload = function () {
				$(item).attr('src', img.src).removeClass(s.params.lazyStatusLoadingClass).addClass(s.params.lazyStatusLoadedClass);
			};
		};
		s.start = function () {
			window.addEventListener('scroll', mainLogic, false);
		};
		s.stop = function () {
			window.removeEventListener('scroll', mainLogic, false);
		};
		s.init = function () {
			s.start();
		};
		s.init();
	};
});
