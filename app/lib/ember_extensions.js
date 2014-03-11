(function(Ember) {
	"use strict"
	Array.prototype.swap = function(indexA, indexB) {
		var temp;
		temp = this[indexA];
		this.replace(indexA, 1, this[indexB]);
		this.replace(indexB, 1, temp);
		return this;
	};
	Ember.IndexedArrayController = Ember.ArrayController.extend({
		controllerAt: function(idx, object, controllerClass) {
			var controller = this._super.apply(this, arguments);
			controller.set('index', idx);
			return controller;
		},
	})
})(Ember);