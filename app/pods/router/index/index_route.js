export default Em.Route.extend({
	beforeModel: function() {
		this.transitionTo('login');
	}
});
