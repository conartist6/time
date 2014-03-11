(function(Em, App) {
	"use strict"
	App.TpEntityDayController = Em.ObjectController.extend({
		index: null,
		color: function() {
			var colors = this.get('parentController.colors');
			return colors.objectAt(this.get('index') % colors.get('length'));
		}.property('parentController.colors'),
		hoursAndMinutes: function() {
			var duration = moment.duration(this.get('minutes'), 'minutes'),
				hours = duration.hours(),
				minutes = duration.minutes();
			return (hours ? hours + " hour" + (hours > 1 ? "s" : "") : "") +
					((hours && minutes) ? ", " : "") +
					(minutes ? minutes + " minute" + (minutes > 1 ? "s" : "") : "");
		}.property('minutes')
	});
})(Ember, App);
