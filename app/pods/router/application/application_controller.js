export default Em.Controller.extend({
	username: null,

	authenticated: Em.computed.bool('username'),

	showHeader: function(key, value) {
		return this.get('authenticated');
	}.property()
});
