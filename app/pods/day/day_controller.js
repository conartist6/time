(function(Em, App) {
	"use strict"
	App.DayController = Em.ObjectController.extend({
		tpCandidates: function() {
			var shuffledColors = App.ShuffledArrayProxy.create({
					content: App.AdjustableAreasSliderComponent.defaultColors
				}), //
				tpEntities = Em.ArrayController.create({
					itemController: 'TpEntityDay',
					content: this.get('model.tpTimeSpent'),
					container: this.get('container')
				});
			tpEntities.forEach(function(entity, index) {
				entity.set('color', shuffledColors.objectAt(index % shuffledColors.get('length')));
			});

			return tpEntities;
		}.property('model.tpTimeSpent.@each'), //`model.' because we're shadowing a model property

		//TODO is it a bug that fixture adapter repopulates models on findAll
		debugObserver: function() {
		}.observes('model.tpTimeSpent'),

		tpTimeSpent: function() {
			return this.get('tpCandidates').filterBy('wasSpent');
		}.property('model.tpTimeSpent.@each.wasSpent'),

		moment: function() {
			return moment.unix(this.get('timestamp'));
		}.property('timestamp'),

		tomorrow: function() {
			return App.Day.formatMomentForURL(moment(this.get('moment')).add('days', 1));
		}.property('moment'),

		yesterday: function() {
			return App.Day.formatMomentForURL(moment(this.get('moment')).subtract('days', 1));
		}.property('moment'),

		totalTpTimeNotSubmitted: function() {
			debugger;
		}.property('tpTimeSpent')
	});
})(Ember, App);
