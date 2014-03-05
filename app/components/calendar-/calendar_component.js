(function(App, Em, moment) {
	"use strict";
	var DefaultHeaderView = Em.View.extend(),
		DefaultDayView = Em.View.extend(),
		HeaderController = Em.Object.extend();

	App.CalendarComponent = Em.Component.extend({
		didInsertElement: function () {
			this.$().children().first().addClass('calendar-component-head');
		},

		classNames: "calendar-component".w(),

		dayItemController: undefined,

		month: function(key, value, oldValue) {
			var _month = oldValue,
				_tentativeMonth;
			if(arguments.length > 1) {
				if(moment.isMoment(value)) {
					_tentativeMonth = moment(value);
				} else {
					_tentativeMonth = moment.unix(value);
				}

				_tentativeMonth.startOf('month');

				if(!(_month && _month.isSame(_tentativeMonth))) {
					_month = _tentativeMonth;
				}
			}
			return _month;
		}.property(),

		_days: function () {
			var days = [],
				month = this.get('month'),
				endOfMonth,
				startOfFirstWeekInMonth,
				endOfLastWeekInMonth;

			if(!month) return null;

			startOfFirstWeekInMonth = moment(month).startOf('week');
			endOfMonth = moment(month).endOf('month');
			endOfLastWeekInMonth = moment(endOfMonth).endOf('week');

			for(var day = startOfFirstWeekInMonth; day.isBefore(endOfLastWeekInMonth); day.add('days', 1)) {
				days.push({
					moment: day,
					date: day.date(),
					isInMonth: day.isAfter(month) && day.isBefore(endOfMonth),
					_dayView: this.get('_dayView')
				})
			}
			return Em.ArrayController.create({
				itemController: this.get('dayItemController'),
				content: days
			});
		}.property('month'),

		headerView: DefaultHeaderView,

		dayView: DefaultDayView,

		_headerView: function () {
			var self = this;

			return this.get('headerView').extend({
				classNames: 'calendar-component-head'.w(),
				controller: HeaderController.create({
					calendar: self,
				})
			});
		}.property('headerView'),

		_dayView: function () {
			return this.get('dayView').extend({
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
		templateName: 'components/calendar-/default_header'
	});

	DefaultDayView.reopen({
		templateName: 'components/calendar-/default_day'
	});
})(App, Ember, moment);