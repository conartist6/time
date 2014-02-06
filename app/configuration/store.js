(function(DS, App) {
	"use strict"

	App.ApplicationAdapter = DS.FixtureAdapter.extend({
	});

	App.ApplicationSerializer = DS.RESTSerializer.extend({
		normalizeHash: {
			day: function(hash) {
				hash.id = hash.timestamp;
				return hash;
			}
		}
	});

	App.store = DS.Store.create({
		adapter: 'ApplicationAdapter'
	});
})(DS, App);
