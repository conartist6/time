export default Em.Route.extend({
	beforeModel: function(transition) {
		if(!this.controllerFor('application').get('authenticated')) {
			// transition.abort();
			this.transitionTo('login');
		}
	}
});
