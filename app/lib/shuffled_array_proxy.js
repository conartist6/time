export default Em.ArrayProxy.extend({
	init: function() {
		this._super();
		var content = this.get('content'), //
			contentLength = content.get('length'),
			i;

		this.muddle = new Array(content.length);

		for(i = 0; i < contentLength; i++) {
			this.muddle[i] = i;
		}

		for(i = 0; i < contentLength; i++) {
			content.swap(Math.randomIntBetween(0, i), contentLength - i);
		}
	},
	muddle: null,
	objectAtContent: function(idx) {
		return this.get('content').objectAt(this.muddle[idx]);
	}
});
