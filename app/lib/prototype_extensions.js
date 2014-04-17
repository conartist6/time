Math.randomIntBetween = function (lo, hi) {
	return Math.floor(Math.random() * hi) + lo;
};
Math.limitToRange = function(lo, hi, number) {
	return Math.min(hi, Math.max(lo, number));
}

Array.prototype.swap = function(indexA, indexB) {
	var temp;
	temp = this[indexA];
	this.replace(indexA, 1, this[indexB]);
	this.replace(indexB, 1, temp);
	return this;
};