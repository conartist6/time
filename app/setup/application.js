import Resolver from "setup/resolver";
import Store from "setup/store";

var Time = Em.Application.extend({
	LOG_TRANSITIONS: true,
  	LOG_MODULE_RESOLVER: true,
	Resolver: Resolver,
	store: Store.create()
});

moment.lang('en', {
	weekdaysMin : ["S", "M", "T", "W", "Th", "F", "S"]
});

export default Time;
