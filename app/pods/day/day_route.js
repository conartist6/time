(function(Em, App) {
	"use strict"
	App.DayRoute = Em.Route.extend({
		model: function(routeParams) {
    		return this.store.find('day', moment(routeParams.date, ["D-MMM", "D-MMM-YYYY"]).unix());
		}
	});
})(Ember, App);
