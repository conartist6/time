export default DS.RESTSerializer.extend({
	normalizeHash: {
		day: function(hash) {
			hash.id = hash.timestamp;
			delete hash.timestamp;
			return hash;
		}
	}
});
