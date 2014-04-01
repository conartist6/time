(function(Em, App) {
	"use strict"
	App.DayRoute = App.AuthenticatedPage.extend({
		model: function(routeParams) {
			return this.store.find('day', App.DayRoute.parseUrlMoment(routeParams.date).unix());
		},
		serialize: function(model) {
			return { date: App.DayRoute.formatMomentForURL(moment.unix(model.id)) };
		}
	});
	App.DayRoute.reopenClass({
		parseUrlMoment: function(str) {
			return moment(str, ["D-MMM", "D-MMM-YYYY"]);
		},
		formatMomentForURL: function(dayMoment) {
			var format;
			if(moment().year() == dayMoment.year()) { format = "D-MMM" }
			else { format = "D-MMM-YYYY" }
			return dayMoment.format(format);
		}
	});
})(Ember, App);
