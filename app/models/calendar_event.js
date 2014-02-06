(function(App, DS) {
	"use strict"
	App.CalendarEvent = DS.Model.extend({
		name: DS.attr("string")
	});

	App.CalendarEvent.FIXTURES = [
		{
			id: 1,
			name: "Breakfast w/ Basile"
		}
	];
})(App, DS);
