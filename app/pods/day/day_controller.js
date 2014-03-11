(function(Em, App) {
	"use strict"
	App.DayController = Em.ObjectController.extend({
		tpCandidates: function() {
			return App.TimeCandidateDayController.create({
					content: this.get('model.tpTimeSpent'),
					container: this.get('container')
				});
		}.property('model.tpTimeSpent.@each'), //`model.' because we're shadowing a model property

		nextColorStyle: function() {
			var tpCandidates = this.get('tpCandidates');
			return "background-color: " + tpCandidates.get('colors').objectAt(tpCandidates.get('length')) + ";";
		}.property('tpCandidates'),

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
			return this.store.all('tpTimeSpent').filterBy('isDirty').filterBy('wasSpent').reduce(function (prev, cur) {
				return prev + Math.floor(cur.get('minutes') / 60);
			}, 0);
		}.property('model.tpTimeSpent.@each.minutes', 'model.tpTimeSpent.@each.wasSpent')
	});
})(Ember, App);
