export default Em.Route.extend({
	needs: 'login',
	beforeModel: function() {
		if(this.controllerFor('application').get('authenticated')) {
			this.transitionToDay();
		}
	},

	isAuthorized: function(username) {
		return true;
	},

	transitionToDay: function(day) {
		day = day || this.transitionToDay(moment().startOf('day').unix());
		this.transitionTo('day', this.store.find('day', day));
	},

	actions: {
		login: function(username, password) {
			this.transitionToDay("1391760000");
			return this.isAuthorized(username);
		}
	}
});
