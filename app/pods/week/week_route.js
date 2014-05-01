(function(Em, App) {
	"use strict"
	App.WeekRoute = App.AuthenticatedPage.extend({
		beforeModel: function(transition) {
			return new Ember.RSVP.Promise(function(resolve) {
				setTimeout(resolve, 716);
			})
		}
	});
})(Ember, App);
