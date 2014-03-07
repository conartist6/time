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
		slidersView: null,

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
		percentage: function(key, pct) {
			if(arguments.length > 1) {
				this.set('minutes', Math.ceil(pct / 100 * 8 * 60));
			} else {
				pct = this.get('minutes') / (8 * 60) * 100;
			}
			return Math.min(100, pct);
		}.property('minutes')
	});

	SlidersView.reopen({
		classNames: "sliders-container".w(),
		init: function () {
			this._super();
			this.set('parentView.slidersView', this);
			this.updateSliders();
		},
		updateSliders: function() {
			var areas = this.get('parentView._areas'), //
				nSliders = areas.get('length'),
				positionPercentageSum = 0.0,
				lastStop;

			this.setObjects([]);
			for(var i = 0; i < nSliders; i++) {
				positionPercentageSum = Math.min(100, positionPercentageSum + areas.objectAt(i).get('percentage'));
				this.pushObject(SliderView.create({
					leftArea: areas.objectAt(i),
					rightArea: areas.objectAt(i+1),
					leftStop: this.objectAt(i-1),
					positionPercentage: positionPercentageSum
				}));
				if(i > 0) {
					this.objectAt(i-1).rightStop = this.objectAt(i);
				}
			}
		}.observes('parentView._areas.[]')
	});

	SliderView.reopen({
		classNames: "stop".w(),
		leftArea: null,
		rightArea: null,
		leftStop: null,
		rightStop: null,
		positionPercentage: function(key, pct, oldValue) {
			var leftStopPct = 0,
				rightStopPct;
			if(arguments.length > 1) {
				pct = Math.min(100, Math.max(0, pct));
				if(this.leftStop) {
					leftStopPct = this.leftStop.positionPercentage;
				}
				if(this.rightStop) {
					rightStopPct = this.rightStop.positionPercentage;
				}
				this.leftArea.set('percentage', pct - leftStopPct);
				if(this.rightArea) {
					// if(!this.get('rightStop.rightArea')) {
					// 	//This is the last segment, ensure it doesn't overflow 100%
					// 	lastStop.leftArea.set('percentage', lastStop.positionPercentage - lastStop.leftStop.positionPercentage);
					// }		
					this.rightArea.set('percentage', rightStopPct - pct);
				}
			}
		}.property(),
		didInsertElement: function () {
			this.setPosition();
		},
		setPosition: function(positionPercentage) {
			this.$().css('margin-left', this.get('positionPercentage') + "%");
		}.observes('positionPercentage')
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