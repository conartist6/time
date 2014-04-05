(function(Em, App) {
	"use strict"
	App.CalendarDayController = Em.ObjectController.extend({
		isInMonth: true,

		date: function() {
			return this.get('moment').date();
		},

		urlDate: function() {
			return App.DayRoute.formatMomentForURL(this.get('moment'));
		}.property(),

		moment: function() {
			return moment.unix(this.get('timestamp'));
		}.property().volatile(),

		colorCode: function() {
			if(this.get('unsavedMinutesSpent') > 0){
				return "#8F8";
			} else if(this.get('minutesSpent') >= 8 * 60) {
				return "#FF8";
			}
			return "transparent";
		}.property('minutesSpent', 'unsavedMinutesSpent'),

		minutesSpent: function() {
			return this.get('tpTimeSpent').reduce(function(sum, item) {
					return sum + item.get('minutes');
				}, 0);
		}.property(),

		unsavedMinutesSpent: function() {
			return this.get('tpTimeSpent').filterBy('isDirty').reduce(function(sum, item) {
					return sum + item.get('minutes');
				}, 0);
		}.property()
	});
})(Ember, App);
