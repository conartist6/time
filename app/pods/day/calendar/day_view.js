(function(App, Em, moment) {
	"use strict";
	App.CalendarDayView = Em.View.extend({
		templateName: 'day/calendar',
		attributeBindings: ['style'],
		style: function () {
			return "background-color: %@;".fmt(this.get('controller.colorCode'));
		}.property('controller.colorCode')
	});
})(App, Ember, moment);
