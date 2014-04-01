(function(App, DS) {
	"use strict"
	App.TpEntity = DS.Model.extend({
		primaryKey: 'number',
		number: DS.attr("string"),
		name: DS.attr("String")
	});

	App.TpEntity.FIXTURES = [
		{
			id: "55555",
			number: "55555",
			name: "Update Hotel Program Research Tool"
		},
		{
			id: "32088",
			number: "32088",
			name: "Air Search Results Draggable Bar"
		},
		{
			id: "39113",
			number: "39113",
			name: "ROH - Booking Report Rooming List Filter Obfuscation"
		},
		{
			id: "11111",
			number: "11111",
			name: "Hotel Amenity Results ICONS"
		},
		{
			id: "00001",
			number: "00001",
			name: "Reusable Tabs Component"
		},
		{
			id: "41443",
			number: "41443",
			name: "DEMO for Serch"
		}
	];
})(App, DS);
