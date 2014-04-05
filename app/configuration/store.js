(function(DS, App) {
	"use strict"

	DS.FixtureAdapter.reopen({
		simulateRemoteResponse: true,
		latency: 500
	});

	App.ApplicationAdapter = DS.FixtureAdapter;

	App.DayAdapter = DS.BoundlessFixtureAdapter;

	App.TpEntityAdapter = DS.BoundlessFixtureAdapter.extend({
		emptyCallback: function(store, type, id) {
			return {
				name: "Unknown"
			}
		}
	});

	App.ApplicationSerializer = DS.RESTSerializer.extend({
		normalizeHash: {
			day: function(hash) {
				hash.id = hash.timestamp;
				delete hash.timestamp;
				return hash;
			}
		}
	});

	App.FixtureStore = DS.Store.extend({
		adapter: 'ApplicationAdapter'
	});

	App.store = App.FixtureStore.create();
})(DS, App);
