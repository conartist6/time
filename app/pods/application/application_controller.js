(function(Em, App) {
	"use strict"
	App.ApplicationController = Em.Controller.extend({
		username: null,

		authenticated: function () {
			return !! this.get('username');
		}.property('username'),
	});
})(Ember, App);
