(function(Em, App) {
	"use strict"
	App.DayController = Em.ObjectController.extend({
		tpCandidates: function() {
			var shuffledColors = App.ShuffledArrayProxy.create({
					content: App.AdjustableAreasSliderComponent.defaultColors
				}), //
				tpEntities = Em.ArrayController.create({
					itemController: App.DayTpEntityController,
					content: this.get('content.tpTimeSpent')
				});
			tpEntities.forEach(function(entity, index) {
				entity.set('color', shuffledColors.objectAt(index % shuffledColors.get('length')));
			});

			return tpEntities
		}.property('content.tpTimeSpent.[]'),
		tpTimeSpent: function() {
			return this.get('tpCandidates').filterBy('wasSpent');
		}.property('content.tpTimeSpent.@each.wasSpent')
	});
})(Ember, App);
