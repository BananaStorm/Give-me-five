export default class Stats {
	
	constructor (student) {
		this.student = student;
		this.presence = 0;
		this.participation = 0;
		this.pertinence = 0;
		this.autonomie = 0;
		this.oral = 0;
	}

	setValue(stat, value) {
		this[stat] = value;
		this.student.$element.find('.' + stat + ' .statValue').html(value);
		this.setScore(this.getScore());

	}

	modValue(stat, mod) {
		this[stat] += mod;
		this.student.$element.find('.' + stat + ' .statValue').html(this[stat]);
		this.setScore(this.getScore());
	}

	setScore(value) {
		this.student.$element.find('.score').html(value + ' points')
	}
	getScore(){
		let s = 0;
		for (let stat in this) {
			if (typeof this[stat] !== 'number') {continue}
			s += this[stat];
		}
		return s;
	}
}