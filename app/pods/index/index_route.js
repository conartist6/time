(function(Em, App) {
	"use strict"
	App.IndexRoute = Em.Route.extend({
		beforeModel: function() {
			// this.transitionTo('day', moment().startOf('day').format("D-MMM"));
			this.transitionTo('day', "7-Feb");
		}
	});
})(Ember, App);
