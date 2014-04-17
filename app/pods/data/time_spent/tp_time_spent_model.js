import TimeSpent from "models/time_spent";

var TpTimeSpent = TimeSpent.extend({
	day: DS.belongsTo('day', { inverse: "tpTimeSpent" }),
	_on: DS.belongsTo('tpEntity')
});

TpTimeSpent.FIXTURES = [
	{
		id: "ember1001",
		minutes: 240,	
		_on: "55555",
	}, {
		id: "ember1002",
		minutes: 240,
		_on: "32088",
	}, {
		id: "1",
		minutes: 60,
		_on: "32088",
	}, {
		id: "2",
		minutes: 170,
		_on: "39113",
	}, {
		id: "3",
		minutes: 250,
		_on: "00001",
	},
	{
		id: "4",
		minutes: 120,
		_on: "41443",
	}
];

export default TpTimeSpent;
