(function(App, Em, moment) {
	"use strict";
	App.MultiStopSliderComponent = Em.Component.extend({
		stops: null,

		colors: null,

		gaps: function() {
			var stops = this.get('stops'), //
				gaps = new Array(stops.size), //
				shuffledColors = App.ShuffledArrayProxy.create({
					content: this.get('colors') || this.defaultColors
				});

			for(var i = 0; i < stops.size; i++) {
				gaps[i] = {
					color: shuffledColors[i],
					percentage: 100.0 / stops.size
				};
			}
		}.property('stops'),

		defaultColors: [
			"DarkSalmon",
			"FireBrick",
			"Gold",
			"Indigo",
			"LightBlue",
			"LimeGreen",
			"LightSlateGray",
			"Orange",
			"Pink",
			"Teal",
			"Tan"
		],

		didInsertElement: function() {

		},
	});
})(App, Ember, moment);