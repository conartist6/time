(function(Em, App) {
	"use strict"
	App.DayController = Em.ObjectController.extend({
		tpCandidates: function() {
			var shuffledColors = App.ShuffledArrayProxy.create({
					content: App.AdjustableAreasSliderComponent.defaultColors
				}), //
				tpEntities = Em.ArrayController.create({
					itemController: 'DayTpEntity',
					content: this.get('tpTimeSpent'),
					container: this.get('container')
				});
			tpEntities.forEach(function(entity, index) {
				entity.set('color', shuffledColors.objectAt(index % shuffledColors.get('length')));
			});

			return tpEntities
		}.property('tpTimeSpent.[]'),
		tpTimeSpent: function() {
			return this.get('tpCandidates').filterBy('wasSpent');
		}.property('tpTimeSpent.@each.wasSpent'),
		moment: function() {
			return moment.unix(this.get('timestamp'));
		}.property('timestamp'),
		tomorrow: function() {
			return generateUrlMoment(this.get('moment').add('days', 1));
		}.property('moment'),
		yesterday: function() {
			return generateUrlMoment(this.get('moment').subtract('days', 1));
		}.property('moment')
	});
})(Ember, App);
