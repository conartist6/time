export default DS.Model.extend({
	minutes: DS.attr('number'),
	wasSpent: DS.attr('boolean', { defaultValue: false }),
	on: function(key, entity, oldValue) {
		var self = this;
		if(arguments.length > 1) {
			if(DS.PromiseObject.detectInstance(entity)) {
				entity.then(function(entity) {
					self.set('_on', entity);
				});
			} else {
				this.set('_on', entity);
			}
			return entity;
		}
		return this.get('_on');
	}.property('_on')
});
