(function(Em, App) {
	"use strict"
	App.LoginRoute = Em.Route.extend({
		needs: 'login',
		beforeModel: function() {
			if(this.get('authenticated')) {
				transitionToDay();
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
				if(this.isAuthorized(username)) {
					this.transitionToDay("1391760000");
					return true;
				} else {
					return false;
				}
			}
		}
	});
})(Ember, App);
