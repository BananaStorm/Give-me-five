export default class Stats {
	
	constructor (student) {
		this.student = student;
		this.presence = 0;
		this.participation = 0;
		this.pertinence = 0;
		this.autonomie = 0;
		this.oral = 0;
	}

	toJSON(){
		let a = {};
		for (let stat in this) {
			if (typeof this[stat] !== 'number') {continue}
			a[stat] = this[stat];
		}
		return a;		
	}

	toString(){
		let a = [];
		for (let stat in this) {
			if (typeof this[stat] !== 'number') {continue}
			a.push(stat +':'+ this[stat]);
		}
		return a.join('&');
	}
}