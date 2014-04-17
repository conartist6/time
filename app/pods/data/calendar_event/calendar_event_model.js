var CalendarEvent = DS.Model.extend({
	name: DS.attr("string")
});

CalendarEvent.FIXTURES = [
	{
		id: 1,
		name: "Breakfast w/ Basile"
	}
];

export default CalendarEvent;
