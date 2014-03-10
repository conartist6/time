(function() {
	"use strict"
	window.App = Em.Application.create({
		LOG_TRANSITIONS: true
	});
	moment.lang('en', {
    	weekdaysMin : ["S", "M", "T", "W", "Th", "F", "S"]
	});
})();
