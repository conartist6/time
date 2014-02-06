(function(Em, App) {
	"use strict"
	App.Router.map(function() {
	  this.resource('day', { path: '/day/:date' });
	});
})(Ember, App);
