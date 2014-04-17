var Router = Em.Router.extend();

Router.map(function() {
	this.route("login");
	this.resource('day', { path: '/day/:date' });
});

export default Router;