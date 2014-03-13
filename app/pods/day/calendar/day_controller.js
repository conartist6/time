(function(Em, App) {
	"use strict"
	App.CalendarDayController = Em.ObjectController.extend({
		urlDate: function() {
			return App.DayRoute.formatMomentForURL(this.get('moment'));
		}.property('moment'),

		colorCode: null,

		updateColorCode: function(day) {
			var tpTimeSpent = day.get('tpTimeSpent').reduce(function(sum, item) {
					return sum + item.get('minutes');
				}, 0);
			if(tpTimeSpent > 0){
				this.set('colorCode', "#8F8");
			}
		},

		day: function() {
			var day = this.store.find('day', this.get('moment').unix()),
				self = this;
			day.then(function () { self.updateColorCode.apply(self, arguments) });
			return day;
		}.property('moment')
	});
})(Ember, App);
