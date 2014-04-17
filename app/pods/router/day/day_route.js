import AuthenticatedRoute from "lib/authentication/authenticated_route";

var DayRoute = AuthenticatedRoute.extend({
	model: function(routeParams) {
		return this.store.find('day', DayRoute.parseUrlMoment(routeParams.date).unix());
	},
	serialize: function(model) {
		return { date: DayRoute.formatMomentForURL(moment.unix(model.id)) };
	}
});

DayRoute.reopenClass({
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

export default DayRoute;
