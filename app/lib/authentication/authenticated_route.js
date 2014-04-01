(function(Em, App) {
	"use strict"
	App.AuthenticatedPage = Em.Route.extend({
		beforeModel: function(transition) {
			if(!this.controllerFor('application').get('authenticated')) {
				// transition.abort();
				this.transitionTo('login');
			}
		}
	});
})(Ember, App);
