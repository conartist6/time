(function(Em, App) {
	"use strict"
	App.ApplicationRoute = Em.Route.extend({
		actions: {
			login: function(username, password) {
				this.set('controller.username', username);
				this.router.one('didTransition', this, function() {
					this.set('controller.showHeader');
				});
			}
		}
	});
})(Ember, App);
