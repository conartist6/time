var get = Em.get,
	set = Em.set;

export default Em.ArrayController.extend({
	controllerAt: function(idx, object, controllerClass) {
		var controller = this._super.apply(this, arguments);
		controller.set('index', idx);
		return controller;
	}
});
