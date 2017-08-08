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
		var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		s.start = function () {
			window.addEventListener('scroll', _private.mainLogic, false);
		};
		s.stop = function () {
			window.removeEventListener('scroll', _private.mainLogic, false);
		};
		var _private = {
			init: function init() {
				_private.mainLogic();
				s.start();
			},
			loadImage: function loadImage(item) {
				var img = new Image();
				img.src = item.getAttribute('data-src');
				img.onload = function () {
					item.setAttribute('src', img.src);
					item.classList.remove(s.params.lazyStatusLoadingClass);
					item.classList.add(s.params.lazyStatusLoadedClass);
				};
			},
			mainLogic: function mainLogic() {
				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				var item = document.querySelectorAll('.' + s.params.lazyLoadingClass);
				var len = item.length;
				for (var i = 0; i < len; i++) {
					if (scrollTop + clientHeight > _private.getOffset(item[i]).top && _private.getOffset(item[i]).top + item[i].offsetHeight > scrollTop) {
						item[i].classList.add(s.params.lazyStatusLoadingClass);
						item[i].classList.remove(s.params.lazyLoadingClass);
						_private.loadImage(item[i]);
					}
				}
			},
			getOffset: function getOffset(dom) {
				var x = 0,
				    y = 0;
				while (dom) {
					x += dom.offsetLeft;
					y += dom.offsetTop;
					dom = dom.offsetParent;
				}
				return {
					left: x,
					top: y
				};
			}
		};
		_private.init();
	};
});
