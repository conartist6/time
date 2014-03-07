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

			//if all items for day have areas, stretch
			//else stretch evenly for all items with 0 time.


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
						sliderWidth,
						leftStopPct = 0,
						rightStopPct;
					if(view) {
						sliderOffset = this.$().offset().left,
						sliderWidth = this.$().width();
						view.set('positionPercentage', Math.min(100, Math.max(0, (event.pageX - sliderOffset) / sliderWidth * 100)));

						if(view.leftStop) {
							leftStopPct = view.leftStop.positionPercentage;
						}
						if(view.rightStop) {
							rightStopPct = view.rightStop.positionPercentage;
						}
						view.leftArea.set('percentage', view.positionPercentage - leftStopPct);
						if(view.rightArea) {
							view.rightArea.set('percentage', rightStopPct - view.positionPercentage);
						}
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
		percentage: function(key, value) {
			if(arguments.length > 1) {
				this.set('minutes', Math.ceil(value / 100 * 8 * 60));
				return value;
			}
			return this.get('minutes') / (8 * 60) * 100;
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
				positionPercentageSum = 0.0;

			this.setObjects([]);
			for(var i = 0; i < nSliders; i++) {
				positionPercentageSum += areas.objectAt(i).get('percentage');
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
		positionPercentage: undefined,
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