(function(DS, App) {
	"use strict"

	App.ApplicationAdapter = DS.FixtureAdapter.extend({
	});

	App.DayAdapter = DS.FixtureAdapter.extend({
		find: function(store, type, id) {
			var fixtures = this.fixturesForType(type),
			fixture;

			if (fixtures) {
			  fixture = Ember.A(fixtures).findProperty('id', id);
			}

			if (!fixture) {
				fixture = {
					id: id,
					timestamp: id
				}
			}

			return this.simulateRemoteCall(function() {
				return fixture;
			}, this);
		}
	});

	App.ApplicationSerializer = DS.RESTSerializer.extend({
		normalizeHash: {
			day: function(hash) {
				hash.id = hash.timestamp;
				return hash;
			}
		}
	});

	App.FixtureStore = DS.Store.extend({
		adapter: 'ApplicationAdapter'
	});

	App.store = App.FixtureStore.create();
})(DS, App);
