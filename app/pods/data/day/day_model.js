var Day = DS.Model.extend({
	timestamp: Em.computed.alias('id'), //unix timestamp for beginning of the day
	tpTimeSpent: DS.hasMany('TpTimeSpent', { async: true }),
	calendarTimeSpent: DS.hasMany('CalendarTimeSpent', { async: true })
});

Day.FIXTURES = [
	{
		id: 1391760000,
		tpTimeSpent: ["ember1001", "ember1002"],
		calendarTimeSpent: ["1"]
	}, {
		id: 1391673600,
		tpTimeSpent: ["1", "2", "3"]
	}, {
		id: 1391846400,
		tpTimeSpent: ["4"]
	}
];

export default Day;
