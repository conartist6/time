(function(Em, App) {
	"use strict"
	var minutesInAWorkDay = 60 * 8;
	App.DayTpEntityController = Em.ObjectController.extend({
		color: null,
		percentage: function(key, value) {
			if(arguments.length > 1) {
				this.set('minutes', Math.ceil(minutesInAWorkDay * value / 100));
				return value;
			}
			return this.get('minutes') / minutesInAWorkDay * 100;
		}.property('minutes'),
	});
})(Ember, App);
