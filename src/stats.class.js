export default class Stats {
	
	constructor () {
		this.presence = 0;
		this.participation = 0;
		this.pertinence = 0;
		this.autonomie = 0;
		this.oral = 0;
	}

	getScore(){
		let s = 0;
		for (stat in this) {
			s += stat;
		}
		return s;
	}
}