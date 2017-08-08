(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.LazyLoad = factory());
}(window, (function() {
	return function(params = {}) {
		let s = this;
		let defaults = {
			lazyLoadingClass: 'lazy-image',
			lazyStatusLoadingClass: 'lazy-loading',
			lazyStatusLoadedClass: 'lazy-loaded',
			lazyScreenMount: 0
		}
		for (let attr in defaults) {
			if (typeof params[attr] === 'undefined') {
				params[attr] = defaults[attr];
			}
		}
		s.params = params;
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		s.start = function() {
			window.addEventListener('scroll', _private.mainLogic, false);
		}
		s.stop = function() {
			window.removeEventListener('scroll', _private.mainLogic, false);
		}
		let _private = {
			init: function() {
				_private.mainLogic();
				s.start();
			},
			loadImage: function(item) {
				let img = new Image();
				img.src = item.getAttribute('data-src')
				img.onload = function() {
					item.setAttribute('src', img.src);
					item.classList.remove(s.params.lazyStatusLoadingClass)
					item.classList.add(s.params.lazyStatusLoadedClass)
				}
			},
			mainLogic: function() {
				let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				let item = document.querySelectorAll('.' + s.params.lazyLoadingClass);
				let len = item.length;
				for (let i = 0; i < len; i++) {
					let top = _private.getOffset(item[i]).top;
					if (scrollTop + clientHeight > top - clientHeight * s.params.lazyScreenMount && top + item[i].offsetHeight + clientHeight * s.params.lazyScreenMount > scrollTop) {
						item[i].classList.add(s.params.lazyStatusLoadingClass);
						item[i].classList.remove(s.params.lazyLoadingClass);
						_private.loadImage(item[i]);
					}
				}
			},
			getOffset: function(dom) {
				let x = 0,
					y = 0;
				while (dom) {
					x += dom.offsetLeft;
					y += dom.offsetTop;
					dom = dom.offsetParent;
				}
				return {
					left: x,
					top: y
				}
			}
		}
		_private.init();
	}
})));
