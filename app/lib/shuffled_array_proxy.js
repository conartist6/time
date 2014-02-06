(function(App, Em) {
	"use strict";
	App.ShuffledArrayProxy = Em.ArrayProxy.extend({
		init: function() {
			this._super();
			var content = this.get('content');

			this.muddle = new Array(content.length);

			for(var i = 0; i < content.length; i++) {
				content.swap(Math.randomIntBetween(0, i), content.length - i);
			}
		},
		muddle: null,
		objectAtContent: function(idx) {
			return this.get('content').objectAt(this.muddle[idx]);
		}
	});
})(App, Ember);
