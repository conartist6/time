import pathResolver from "setup/path_resolver";

if (typeof requirejs.entries === 'undefined') {
	requirejs.entries = requirejs._eak_seen;
}

export default Resolver = Em.JJAbramsResolver.extend({
	resolveOther: function(parsedName) {
		var moduleEntries = requirejs.entries,
			modulePath,
			module;


		module = moduleEntries[pathResolver(modulePath)];
		return module;
	}
});