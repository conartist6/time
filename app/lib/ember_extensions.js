(function(Ember) {
	"use strict"
	Array.prototype.swap = function(indexA, indexB) {
		var temp;
		temp = this[indexA];
		this.replace(indexA, 1, this[indexB]);
		this.replace(indexB, 1, temp);
		return this;
	};
})(Ember);