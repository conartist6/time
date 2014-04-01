(function(App, DS) {
	"use strict"
	App.TimeSpent = DS.Model.extend({
		minutes: DS.attr('number'),
		wasSpent: DS.attr('boolean', { defaultValue: false }),
		on: function(key, entity, oldValue) {
			var self = this;
			if(arguments.length > 1) {
				if(DS.PromiseObject.detectInstance(entity)) {
					entity.then(function(entity) {
						self.set('_on', entity);
					});
				} else {
					this.set('_on', entity);
				}
				return entity;
			}
			return this.get('_on');
		}.property('_on')
	});

	App.TpTimeSpent = App.TimeSpent.extend({
		day: DS.belongsTo('day', { inverse: "tpTimeSpent" }),
		_on: DS.belongsTo('tpEntity')
	});

	App.CalendarTimeSpent = App.TimeSpent.extend({
		day: DS.belongsTo('day', { inverse: "calendarTimeSpent" }),
		_on: DS.belongsTo('calendarEvent')
	});	

	App.TpTimeSpent.FIXTURES = [
		{
			id: "ember1001",
			minutes: 240,	
			_on: "55555",
		}, {
			id: "ember1002",
			minutes: 240,
			_on: "32088",
		}, {
			id: "1",
			minutes: 60,
			_on: "32088",
		}, {
			id: "2",
			minutes: 170,
			_on: "39113",
		}, {
			id: "3",
			minutes: 250,
			_on: "00001",
		},
		{
			id: "4",
			minutes: 120,
			_on: "41443",
		}
	];

	App.CalendarTimeSpent.FIXTURES = [
		{
			id: "1",
			minutes: 40,
			_on: 1
		}
	];
})(App, DS);
