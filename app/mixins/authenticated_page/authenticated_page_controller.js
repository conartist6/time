(function(Em, App) {
	"use strict"
	App.AuthenticatedPage = Em.Mixin.create({
		needs: ['application'],
		username: Em.computed.alias('controllers.application.username'),
		authenticated: Em.computed.alias('controllers.application.authenticated')
	});
})(Ember, App);
