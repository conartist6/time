(function() {
	"use strict"
	Math.randomIntBetween = function (lo, hi) {
		return Math.floor(Math.random() * hi) + lo;
	};
})();