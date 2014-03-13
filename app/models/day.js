(function(App, DS) {
	"use strict"
	App.Day = DS.Model.extend({
		primaryKey: 'timestamp',
		timestamp: DS.attr('number'), //unix timestamp for beginning of the day
		tpTimeSpent: DS.hasMany('TpTimeSpent', { async: true }),
		calendarTimeSpent: DS.hasMany('CalendarTimeSpent', { async: true })
	});

	App.Day.FIXTURES = [
		{
			id: 1391760000,
			timestamp: 1391760000,
			tpTimeSpent: ["ember1001", "ember1002"],
			calendarTimeSpent: ["1"]
		}, {
			id: 1391673600,
			timestamp: 1391673600,
			tpTimeSpent: ["1", "2", "3"]
		}
	];
})(App, DS);
