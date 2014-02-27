calendar_component.js
(function(App, Em, moment) {
	"use strict";
	var DefaultHeaderView = Em.View.extend(),
		DefaultDayView = Em.View.extend()
		HeaderController = Em.Object.extend();

	App.CalendarComponent = Em.Component.extend({
		didInsertElement: function () {
			this.$().children().first().addClass('calendar-component-head');
		}

		classNames: "calendar-component".w(),

		dayItemController: undefined,

		month: function(key, value) {
			if(arguments.length > 1) {
				_month = moment(value).startOf('month'));
			}
			return _month;
		}.property(),

		_month: null,

		_days: function () {
			var days = [],
				endOfMonth = moment(_month).endOf('month');

			for(var day = moment(_month).startOf('week');
					day.add('days', 1);
					day.isBefore(moment(endOfMonth).endOf('week'))) {
				days.push({
					moment: day,
					date: day.date(),
					isInMonth: day.isAfter(_month) && day.isBefore(endOfMonth),
				})
			}
			return Em.ArrayController.create({
				itemController: dayItemController,
				content: days
			});
		}.property('month'),

		headerView: DefaultHeaderView,

		dayView: DefaultDayView,

		_headerView: function () {
			var self = this;

			return this.get('headerView').reopen({
				classNames: 'calendar-component-head'.w(),
				controller: HeaderController.create({
					calendar: self,
				})
			});
		}.property('headerView'),

		_dayView: function () {
			return this.get('dayView').reopen({
				classNames: 'calendar-component-day'.w()
			});
		}.property('dayView')
	});

	HeaderController.reopen({
		calendar: null,
		monthName: function() {
			return moment(this.get('calendar.month')).format("MMMM");
		}.property('calendar.month')
	});

	DefaultHeaderView.reopen({
		templateName: 'components/calendar-/templates/default_header',

		controller: headerController
	});

	DefaultDayView.reopen({
		templateName: 'components/calendar-/templates/default_day'
	});
})(App, Ember, moment);