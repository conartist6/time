(function(Em, App) {
	"use strict"
	App.TimeCandidateDayController = Em.IndexedArrayController.extend({
		itemController: 'TpEntityDay',
		colors: null,
	});
})(Ember, App);
