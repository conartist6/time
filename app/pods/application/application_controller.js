(function(Em, App) {
	"use strict"
	App.ApplicationController = Em.Controller.extend({
		username: null,

		authenticated: Em.computed.bool('username'),

		showHeader: function(key, value) {
			return this.get('authenticated');
		}.property()
	});
})(Ember, App);
