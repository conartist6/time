calendar_component.js
(function(App, Em, moment) {
	"use strict";
	var DefaultHeaderView = Em.View.extend(),
		DefaultDayView = Em.View.extend();

	App.CalendarComponent = Em.Component.extend({
		didInsertElement: function () {
			this.$().children().first().addClass('calendar-component-head');
		}

		classNames: "calendar-component".w(),

		headerView: DefaultHeaderView,

		dayView: DefaultDayView,

		_headerView: function() {
			return this.get('headerView').reopen({
				classNames: 'calendar-component-head'.w()
			});
		}.property('headerView'),

		_dayView: function() {
			return this.get('dayView').reopen({
				classNames: 'calendar-component-day'.w()
			});
		}.property('dayView'),
	});


	DefaultHeaderView.reopen({
		templateName: 'components/calendar-/templates/default_header',

		
	});
})(App, Ember, moment);