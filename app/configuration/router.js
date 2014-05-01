(function(Em, App) {
	"use strict"
	App.Router.map(function() {
		this.route("login");
		this.resource('day', { path: '/day/:date' });
		this.route('week');
	});
})(Ember, App);
