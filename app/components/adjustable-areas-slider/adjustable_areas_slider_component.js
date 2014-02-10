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
				nAreas = areas.get('length'), //
				_areas = []; //

			for(var i = 0; i < nAreas; i++) {
				_areas[i] = SliderAreaController.create({
					percentage: 100.0 / nAreas,
					color: areas.objectAt(i).get('color')
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
					var view = this.get('sliderBeingDragged'), //
						controller, //
						sliderOffset, //
						sliderWidth;
					if(view) {
						controller = view.get('controller');
						sliderOffset = this.$().offset().left,
						sliderWidth = this.$().width();
						controller.set('positionPercentage', Math.min(100, Math.max(0, (event.pageX - sliderOffset) / sliderWidth * 100)));
						controller.set('leftArea.percentage', controller.get('positionPercentage') - (controller.get('leftStop.controller.positionPercentage') || 0));
						controller.set('rightArea.percentage', (controller.get('rightStop.controller.positionPercentage') || 100) - controller.get('positionPercentage'));
					}
				}.bind(this)
			}
		}.property()
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
				areas = this.get('parentView._areas'), //
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
					this.objectAt(i-1).set('controller.rightStop', this.get('lastObject'));
				}
			}
		}.observes('parentView._areas.[]')
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
})(App, Ember, moment);