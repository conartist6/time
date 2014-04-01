(function(App, Em, moment) {
	"use strict";
	var SlidersView = Em.ContainerView.extend(), //
		SliderView = Em.View.extend(), //
		SliderAreaController;

	App.AdjustableAreasSliderComponent = Em.Component.extend({
		classNames: "adjustable-areas-slider-component".w(),
		areas: null,

		_areas: function() {
			var areas = this.get('areas'),
				_areas = [];

			for(var i = 0; i < areas.get('length'); i++) {
				_areas[i] = SliderAreaController.create({
					content: areas.objectAt(i)
				});
			}

			return _areas;
		}.property('areas.[]'),

		SlidersView: SlidersView,

		sliderBeingDragged: null,	

		eventManager: function() {
			return {
				mouseDown: function(event, view) {
					if(SliderView.detectInstance(view)) {
						this.set('sliderBeingDragged', view);
					}
					event.preventDefault();
				}.bind(this),
				mouseUp: function(event, view) {
					this.set('sliderBeingDragged', null);
				}.bind(this),
				mouseMove: function(event) {
					var view = this.get('sliderBeingDragged'),
						sliderOffset,
						sliderWidth;
					if(view) {
						sliderOffset = this.$().offset().left,
						sliderWidth = this.$().width();
						view.set('positionPercentage', (event.pageX - sliderOffset) / sliderWidth * 100);
					}
				}.bind(this)
			}
		}.property()
	});

	SliderAreaController = Ember.Object.extend({
		content: null,

		style: function() {
			return "background-color: %@; width: %@%;".fmt(this.get('color'), this.get('percentage'));
		}.property('percentage', 'color'),

		minutes: Ember.computed.alias('content.minutes'),
		color: Ember.computed.alias('content.color'),

		percentage: function(key, pct, oldValue) {
			//This property stores precise percentages, calculates from minutes if it must,
			//and updates minutes from precise values.
			if(arguments.length > 1) {
				Em.run.next(this, this.set, 'minutes', Math.ceil(pct / 100 * 8 * 60));
				// this.set('minutes',
					// Math.ceil(pct / 100 * 8 * 60 / 15 - .5) * 15);
			} else {
				pct = this.get('minutes') / (8 * 60) * 100;
			}
			return pct;
		}.property()
	});

	SlidersView.reopen({
		classNames: "sliders-container".w(),
		init: function () {
			this._super();
			this.updateSliders();
		},
		updateSliders: function() {
			var areas = this.get('parentView._areas'), //
				views = [],
				nSliders = areas.get('length'),
				positionPercentageSum = 0.0,
				lastStop;

			for(var i = 0; i < nSliders; i++) {
				views.push(SliderView.create());
			}
			for(var i = 0; i < nSliders; i++) {
				positionPercentageSum += areas.objectAt(i).get('percentage');

				views.objectAt(i).setProperties({
					leftArea: areas.objectAt(i),
					rightArea: areas.objectAt(i+1),
					leftStop: views.objectAt(i-1),
					rightStop: views.objectAt(i+1),
					positionPercentage: positionPercentageSum
				});
			}
			this.setObjects(views);
		}.observes('parentView._areas.[]')
	});

	SliderView.reopen({
		classNames: "stop".w(),
		leftArea: null,
		rightArea: null,
		leftStop: null,
		rightStop: null,

		positionPercentage: function(key, pct, oldValue) {
			if(arguments.length > 1) {			
				var leftStopPct = 0,
					rightStopPct;

				pct = Math.limitToRange(0, 100, pct);
				if(this.leftStop) {
					leftStopPct = this.leftStop.get('positionPercentage');
				}
				this.leftArea.set('percentage', pct - leftStopPct);
				if(oldValue !== undefined) {
					if(this.rightStop) {
						rightStopPct = this.rightStop.get('positionPercentage');
					}
					if(this.rightArea) {
						this.rightArea.set('percentage', rightStopPct - pct);
					}
				}
			}
			return pct;
		}.property(),

		updateSlider: function() {
			if(this.$()) {
				this.$().css('margin-left', this.get('positionPercentage') + "%");
			}
		}.observes('positionPercentage'),

		didInsertElement: function () {
			this.updateSlider();
		}
	});

	App.AdjustableAreasSliderComponent.reopenClass({
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
		]
	});
})(App, Ember, moment);