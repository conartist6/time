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

		_weeks: function (key, value, oldValue) {
			var weeks = [],
				days,
				month = this.get('month'),
				endOfMonth,
				firstWeek,
				lastWeek,
				nextWeek;

			if(!month) return null;
			if(oldValue) {
				debugger;
			}

			firstWeek = moment(month).startOf('week');
			endOfMonth = moment(month).endOf('month');
			lastWeek = moment(endOfMonth).startOf('week').add('weeks', 1);

			for(var week = firstWeek; week.isBefore(lastWeek); week.add('weeks', 1)) {
				nextWeek = moment(week).add('weeks', 1);
				days = [];
				for(var day = moment(week); day.isBefore(nextWeek); day.add('days', 1)) {
					days.push(this.store.recordForId('day', day.unix()));
				}

				weeks.push({
					days: WeekController.create({
						itemController: this.get('dayController'),
						parentController: this,
						target: this,
						container: this.get('container'),
						content: days
					})
				});
			}

			return weeks;
		}.property('month'),

		headerView: function (key, view, oldValue) {
			if(arguments.length > 1) {
				if(typeof view == "string") {
					view = this.get('container').lookup('view:' + view);
				}
			}

			view = view || DefaultHeaderView;
			view = view.extend({
				controller: HeaderController.create({
					calendar: this
				})
			});

			return view;
		}.property(),

		dayView: function (key, view, oldValue) {
			if(arguments.length > 1) {
				if(typeof view == "string") {
					view = this.get('container').lookupFactory('view:' + view);
				}
			}

			return view || DefaultDayView;
		}.property(),

		dayController: function(key, controller, oldValue) {
			if(arguments.length > 1) {
				controller.reopen({
					month: Em.computed.alias('parentController.parentController.month'),
					isInMonth: function() {
						(day.isAfter(month) || day.isSame(month)) && day.isBefore(endOfMonth)
					}.property('month'),
					dayView: this.get('dayView')
					// });
				});
			}
			return controller;
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