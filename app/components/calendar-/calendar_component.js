(function(App, Em, moment) {
	"use strict";
	var DefaultHeaderView = Em.View.extend(),
		DefaultDayView = Em.View.extend(),
		HeaderController = Em.Object.extend();

	App.CalendarComponent = Em.Component.extend({
		didInsertElement: function () {
			this.$().children().first().addClass('calendar-component-head');
		},

		tagName: "table",

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

		dayNames: function() {
			return moment.langData()._weekdaysMin;
		}.property(),

		_weeks: function () {
			var weeks = [],
				days,
				month = this.get('month'),
				endOfMonth,
				firstWeek,
				lastWeek,
				nextWeek;

			if(!month) return null;

			firstWeek = moment(month).startOf('week');
			endOfMonth = moment(month).endOf('month');
			lastWeek = moment(endOfMonth).startOf('week').add('weeks', 1);

			for(var week = firstWeek; week.isBefore(lastWeek); week.add('weeks', 1)) {
				nextWeek = moment(week).add('weeks', 1);
				days = [];
				for(var day = moment(week); day.isBefore(nextWeek); day.add('days', 1)) {
					days.push({
						moment: day,
						date: day.date(),
						urlDate: App.Day.formatMomentForURL(day),
						isInMonth: (day.isAfter(month) || day.isSame(month)) && day.isBefore(endOfMonth),
						_dayView: this.get('dayView')
					});
				}

				weeks.push({
					days: Em.ArrayController.create({
						itemController: this.get('dayItemController'),
						content: days
					})
				});
			}

			return weeks;
		}.property('month'),

		headerView: DefaultHeaderView,

		dayView: DefaultDayView,

		_headerView: function () {
			var self = this;

			return this.get('headerView').extend({
				controller: HeaderController.create({
					calendar: self,
				})
			});
		}.property('headerView'),
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