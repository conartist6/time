(function(Em, App) {
	"use strict"
	App.TimeCandidateDayController = Em.IndexedArrayController.extend({
		itemController: 'TpEntityDay',
		colors: App.ShuffledArrayProxy.create({
			content: App.AdjustableAreasSliderComponent.defaultColors
		}),
	});
})(Ember, App);
