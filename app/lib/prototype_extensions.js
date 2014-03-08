(function() {
	"use strict"
	Math.randomIntBetween = function (lo, hi) {
		return Math.floor(Math.random() * hi) + lo;
	};
	Math.limitToRange = function(lo, hi, number) {
		return Math.min(hi, Math.max(lo, number));
	}
})();