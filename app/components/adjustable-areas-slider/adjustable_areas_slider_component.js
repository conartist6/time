(function(App, Em, moment) {
	"use strict";
	var SlidersView = Em.ContainerView.extend(), //
		SliderView = Em.View.extend(), //
		SliderAreaController;

	App.AdjustableAreasSliderComponent = Em.Component.extend({
		classNames: "adjustable-areas-slider-component".w(),
		areas: null,

		initAreas: function() {
			var areas = this.get('areas'), //
				nAreas = areas.get('length'), //
				areaAccountedFor = areas.reduce(function(prev, area) {
					return prev + area.get('percentage') || 0;
				}, 0.0);

			areas.forEach(function(area) {
				area.set('percentage', (100.0 - areaAccountedFor) / nAreas);
			});
		}.observes('areas.[]'),

		colors: null,

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
					var view = this.get('sliderBeingDragged'), //
						controller, //
						sliderOffset, //
						sliderWidth, //
						leftStopPct = 0, //
						rightStopPct = 100;
					if(view) {
						controller = view.get('controller');
						sliderOffset = this.$().offset().left,
						sliderWidth = this.$().width();
						controller.set('positionPercentage', Math.min(100, Math.max(0, (event.pageX - sliderOffset) / sliderWidth * 100)));

						if(controller.leftStop) {
							leftStopPct = controller.leftStop.controller.positionPercentage;
						}
						if(controller.rightStop) {
							rightStopPct = controller.rightStop.controller.positionPercentage;
						}
						controller.leftArea.set('percentage', controller.positionPercentage - leftStopPct);
						controller.rightArea.set('percentage', rightStopPct - controller.positionPercentage);
					}
				}.bind(this)
			}
		}.property()
	});

	SliderAreaController = Ember.Object.extend({
		color: null,
		percentage: null,
		style: function() {
			return "background-color: %@; width: %@%;".fmt(this.get('color'), this.get('percentage'));
		}.property('percentage', 'color')
	});

	SlidersView.reopen({
		classNames: "sliders-container".w(),
		init: function () {
			this._super();
			this.set('parentView.slidersView', this);
		},
		childViews: [],
		updateSliders: function() {
			var views = this.get('childViews'), //
				areas = this.get('parentView.areas'), //
				nSliders = Math.max(0, areas.get('length') - 1),
				positionPercentageSum = 0.0;

			this.setObjects([]);
			for(var i = 0; i < nSliders; i++) {
				positionPercentageSum += areas.objectAt(i).get('percentage');
				this.pushObject(SliderView.create({
					controller: Ember.Object.create({
						leftArea: areas.objectAt(i),
						rightArea: areas.objectAt(i+1),
						leftStop: this.get('lastObject'),
						positionPercentage: positionPercentageSum
					})
				}));
				if(i > 0) {
					this.objectAt(i-1).controller.rightStop = this.get('lastObject');
				}
			}
		}.observes('parentView.areas.[]')
	});

	SliderView.reopen({
		classNames: "stop".w(),
		didInsertElement: function () {
			this.setPosition();
		},
		setPosition: function(positionPercentage) {
			this.$().css('margin-left', this.get('controller.positionPercentage') + "%");
		}.observes('controller.positionPercentage')
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