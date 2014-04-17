import BoundlessFixtureAdapter from "lib/boundless_fixture_adapter";

export default BoundlessFixtureAdapter.extend({
	emptyCallback: function(store, type, id) {
		return {
			name: "Unknown"
		}
	}
});
