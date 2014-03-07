(function(App, Em, moment) {
	"use strict";
	var DefaultHeaderView = Em.View.extend(),
		DefaultDayView = Em.View.extend(),
		HeaderController = Em.Object.extend(),
		WeekController = Em.ArrayController.extend();

	App.CalendarComponent = Em.Component.extend({
		didInsertElement: function () {
			this.$().children().first().addClass('calendar-component-head');
		},

		tagName: "table",

		classNames: "calendar-component".w(),

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
						moment: moment(day),
						date: day.date(),
						isInMonth: (day.isAfter(month) || day.isSame(month)) && day.isBefore(endOfMonth),
						dayView: this.get('dayView')
					});
				}

				weeks.push({
					days: WeekController.create({
						itemController: this.get('dayController'),
						container: this.get('container'),
						content: days
					})
				});
			}

			return weeks;
		}.property('month'),

		headerView: function (key, value, oldValue) {
			var view;
			if(arguments.length > 1) {
				view = value;
				if(typeof view == "string") {
					view = this.get('container').lookup('view:' + view);
				}
				view = view.extend({
					controller: HeaderController.create({
						calendar: this
					})
				});
			}

			return view || DefaultHeaderView;
		}.property(),

		dayView: function (key, value, oldValue) {
			var view;
			if(arguments.length > 1) {
				view = value;
				if(typeof view == "string") {
					view = this.get('container').lookupFactory('view:' + view);
				}
			}

			return view || DefaultDayView;
		}.property()
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