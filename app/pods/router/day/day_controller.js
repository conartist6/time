import ShuffledArrayProxy from "lib/shuffled_array_proxy";
import TimeCandidateDayController from "controllers/time_candidate/day";
import AdjustableAreasSliderComponent from "components/adjustable-areas-slider";
import DayRoute from "routes/day";

export default Em.ObjectController.extend({
	tpCandidates: function() {
		return TimeCandidateDayController.create({
				content: this.get('model.tpTimeSpent'),
				container: this.get('container'),
				colors: ShuffledArrayProxy.create({
					content: AdjustableAreasSliderComponent.defaultColors
				})
			});
	}.property('model.tpTimeSpent'), //`model.' because we're shadowing a model property

	nextColorStyle: function() {
		var tpCandidates = this.get('tpCandidates');
		return "background-color: " + tpCandidates.get('colors').objectAt(tpCandidates.get('length')) + ";";
	}.property('model.tpTimeSpent.@each'),

	tpNumberInput: "",

	tpTimeSpent: function() {
		return this.get('tpCandidates').filterBy('wasSpent');
	}.property('model.tpTimeSpent.@each.wasSpent'),

	moment: function() {
		return moment.unix(this.get('timestamp'));
	}.property('timestamp'),

	tomorrow: function() {
		return DayRoute.formatMomentForURL(moment(this.get('moment')).add('days', 1));
	}.property('moment'),

	yesterday: function() {
		return DayRoute.formatMomentForURL(moment(this.get('moment')).subtract('days', 1));
	}.property('moment'),

	totalTpTimeNotSubmitted: function() {
		return Math.floor(this.store.all('tpTimeSpent').filterBy('isDirty').filterBy('wasSpent').reduce(function (prev, cur) {
			return prev + cur.get('minutes');
		}, 10) / 60);
	}.property('model.tpTimeSpent.@each.minutes', 'model.tpTimeSpent.@each.wasSpent'),

	actions: {
		addCandidate: function() {
			var self = this,
				tpNumberInput = this.get('tpNumberInput'),
				timeSpent,
				on;

			timeSpent = this.store.createRecord('tpTimeSpent', {
				minutes: 60,
				wasSpent: true,
				on: this.store.findById('tpEntity', tpNumberInput)
			});

			timeSpent.set('on.content', {
				number: tpNumberInput,
				name: "Unknown"
			});

			this.get('model.tpTimeSpent').pushObject(timeSpent);
			this.set('tpNumberInput', "");
		}
	}
});
