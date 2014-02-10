(function(Em, App) {
	"use strict"
	App.DayController = Em.ObjectController.extend({
		tpEntities: function() {
			var shuffledColors = App.ShuffledArrayProxy.create({
					content: App.AdjustableAreasSliderComponent.defaultColors
				}), //
				tpEntities = Em.ArrayController.create({
					itemController: App.DayTpEntityController,
					content: this.get('content.tpEntities')
				});
			tpEntities.forEach(function(entity, index) {
				entity.set('color', shuffledColors.objectAt(index % shuffledColors.get('length')));
			});
			return tpEntities;
		}.property('content.tpEntities.[]')
	});
})(Ember, App);
