(function(App, DS) {
	"use strict"
	App.TimeSpent = DS.Model.extend({
		minutes: DS.attr('number'),
		wasSpent: DS.attr('boolean', { defaultValue: false })
	});

	App.TpTimeSpent = App.TimeSpent.extend({
		day: DS.belongsTo('day', { inverse: "tpTimeSpent" }),
		on: DS.belongsTo('tpEntity')
	});

	App.CalendarTimeSpent = App.TimeSpent.extend({
		day: DS.belongsTo('day', { inverse: "calendarTimeSpent" }),
		on: DS.belongsTo('calendarEvent')
	});	

	App.TpTimeSpent.FIXTURES = [
		{
			id: "ember1001",
			minutes: 0,	
			on: "55555",
		}, {
			id: "ember1002",
			minutes: 0,
			on: "32088",
		}, {
			id: "1",
			minutes: 61,
			on: "32088",
		}, {
			id: "2",
			minutes: 170,
			on: "39113",
		}, {
			id: "3",
			minutes: 250,
			on: "00001",
		}
	];

	App.CalendarTimeSpent.FIXTURES = [
		{
			id: "1",
			minutes: 40,
			on: 1
		}
	];
})(App, DS);
