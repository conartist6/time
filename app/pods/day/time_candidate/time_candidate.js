(function(Em, App) {
	"use strict"
	App.TimeCandidateDayController = Em.IndexedArrayController.extend({
		itemController: 'TpEntityDay',
		colors: null,
		// pendingCandidate: null,
		// objectAtContent: function(idx) {
		// 	var pendingCandidate = this.get('pendingCandidate');

		// 	if(idx == this.get('content.length') && pendingCandidate) {
		// 		return this.controllerAt(idx, pendingCandidate, this.itemController);
		// 	}
		// 	return this._super.apply(this, arguments);
		// },
		// // length: function() {
		// // 	return this.get('content.length') + (this.get('pendingCandidate') ? 1 : 0);
		// // }.property('content.length', 'pendingCandidate')
	});
})(Ember, App);
