(function(App, Em, moment) {
	"use strict";
	var SlidersView = Em.ContainerView.extend(), //
		SliderView = Em.View.extend(), //
		SliderAreaController;

	App.AdjustableAreasSliderComponent = Em.Component.extend({
		classNames: "adjustable-areas-slider-component".w(),
		areas: null,

		colors: null,

		_areas: function() {
			var areas = this.get('areas'), //
				area, //
				nAreas = areas.get('length'), //
				_areas = [];

			for(var i = 0; i < nAreas; i++) {
				area = areas.objectAt(i)

				_areas[i] = SliderAreaController.create({
					content: area,
					color: area.get('color')
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
		color: null,

		style: function() {
			return "background-color: %@; width: %@%;".fmt(this.get('color'), this.get('percentage'));
		}.property('percentage', 'color'),

		minutes: Ember.computed.alias('content.minutes'),

		percentage: function(key, pct, oldValue) {
			//if there is no cached percentage, create one from minutes.
			//THE BUG -- setting minutes invalidates cached value on next run loop.
			if(arguments.length > 1) {
				this.set('minutes', Math.ceil(pct / 100 * 8 * 60));
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
			//We have two sorts of percentages: exact and inexact.
			//We 'export' to inexact percentages: minutes
			//When we bring areas back all inexact percentages need to become exact ones
			//Our strategy is to treat them as exact by ratios and round the last segment if the sum would exceed 100%

			if(arguments.length > 1) {			
				var leftStopPct = 0,
					rightStopPct;

				pct = Math.limitToRange(0, 99, pct);
				if(this.leftStop) {
					leftStopPct = this.leftStop.get('positionPercentage');
				}
				this.leftArea.set('percentage', pct - leftStopPct);
				if(oldValue) {
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