(function(App, DS) {
	"use strict"
	App.TpEntity = DS.Model.extend({
		primaryKey: 'number',
		number: DS.attr("string")
	});

	App.TpEntity.FIXTURES = [
		{
			id: "55555",
			number: "55555"
		},
		{
			id: "32088",
			number: "32088"
		},
		{
			id: "39113",
			number: "39113"
		},
		{
			id: "11111",
			number: "11111"
		},
		{
			id: "00001",
			number: "00001"
		}
	];
})(App, DS);
