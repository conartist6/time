import Time from "configuration/application";

DS.FixtureAdapter.reopen({
	simulateRemoteResponse: true,
	latency: 500
});

var Store = DS.Store.extend({
	adapter: 'ApplicationAdapter'
});

Time.initializer({
	name: "ember_data",
	initialize: function(app, container) {
		container.register("store:main", Store, {singleton: true});
	}
});

export default Store;