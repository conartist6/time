(function(Em, App) {
	"use strict"
	App.IndexRoute = Em.Route.extend({
		beforeModel: function() {
			this.transitionTo('login');
		}
	});
})(Ember, App);
