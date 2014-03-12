(function(Ember, DS) {
	"use strict"

	var get = Ember.get,
		set = Ember.set;

	Array.prototype.swap = function(indexA, indexB) {
		var temp;
		temp = this[indexA];
		this.replace(indexA, 1, this[indexB]);
		this.replace(indexB, 1, temp);
		return this;
	};

	Ember.IndexedArrayController = Ember.ArrayController.extend({
		controllerAt: function(idx, object, controllerClass) {
			var controller = this._super.apply(this, arguments);
			controller.set('index', idx);
			return controller;
		},
	});

	DS.BoundlessFixtureAdapter = DS.FixtureAdapter.extend({
		find: function(store, type, id) {
			var fixtures = this.fixturesForType(type),
			fixture;

			if (fixtures) {
				fixture = Ember.A(fixtures).findProperty('id', id);
			}

			if (!fixture) {
				if(this.emptyCallback) {
					fixture = this.emptyCallback(store, type, id);
				}
				fixture = fixture || {};
				set(fixture, 'id', id);
			}

			return this.simulateRemoteCall(function() {
				return fixture;
			}, this);
		}
	});

})(Ember, DS);