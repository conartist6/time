import TimeSpent from "models/time_spent";

var CalendarTimeSpent = TimeSpent.extend({
	day: DS.belongsTo('day', { inverse: "calendarTimeSpent" }),
	_on: DS.belongsTo('calendarEvent')
});

CalendarTimeSpent.FIXTURES = [
	{
		id: "1",
		minutes: 40,
		_on: 1
	}
];

export default CalendarTimeSpent;
