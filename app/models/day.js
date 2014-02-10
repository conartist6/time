(function(App, DS) {
	"use strict"
	App.Day = DS.Model.extend({
		primaryKey: 'timestamp',
		timestamp: DS.attr('number'), //unix timestamp for beginning of the day
		tpEntities: DS.hasMany('tpEntity', { async: true }),
		calendarEvents: DS.hasMany('calendarEvent', { async: true })
	});

	App.Day.FIXTURES = [
		{
			id: 1391760000,
			timestamp: 1391760000,
			tpEntities: ["55555", "32088"],
			calendarEvents: [1]
		},
		{
			id: 1391673600,
			timestamp: 1391673600,
			tpEntities: ["32088", "39113", "00001"]
		}
	];
})(App, DS);
