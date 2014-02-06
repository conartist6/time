(function(App, Em, moment) {
	"use strict";
	App.ClockView = Em.View.extend({
		didInsertElement: function() {
			this.timer = this.updateTime();
		},
		willDestroyElement: function() {
			Em.run.cancel(this.timer);
		},
		updateTime: function() {
			var now = moment(), //
				//Timer expires in the middle of seconds to keep timing variations from making seconds stick or jump
				nextTimeoutInMs = now.endOf('second').diff(now) + this.partialSecondOffset + 400;
			this.timer = Em.run.later(this, this.updateTime, nextTimeoutInMs);

			this.$().html(now.format("HH:mm:ss"));
		},
		timer: null
	});
})(App, Ember, moment);