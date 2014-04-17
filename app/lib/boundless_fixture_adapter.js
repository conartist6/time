var set = Em.set;

export default DS.FixtureAdapter.extend({
	find: function(store, type, id) {
		var fixtures = this.fixturesForType(type),
		fixture;

		if (fixtures) {
			fixture = Em.A(fixtures).findProperty('id', id);
		}

		if (!fixture) {
			if(this.emptyCallback) {
				fixture = this.emptyCallback(store, type, id);
			}
			fixture = fixture || {};
			set(fixture, 'id', id);
		}

		return this.simulateRemoteCall(function() {
			return fixture;
		}, this);
	}
});