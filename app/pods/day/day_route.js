(function(Em, App) {
	"use strict"
	App.DayRoute = Em.Route.extend({
		model: function(routeParams) {
    		return this.store.find('day', App.Day.parseUrlMoment(routeParams.date).unix());
		}
	});
})(Ember, App);
