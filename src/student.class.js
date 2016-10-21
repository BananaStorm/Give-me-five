import Stats from './stats.class'
import * as data from './data'

export default class Student {
	
	constructor (firstName, lastName, picture, color = '#ff6633') {
		this.firstName = firstName;
		this.lastName  = lastName;
		this.picture   = picture || 'images/userdefault.png';
		this.color     = color ;
		this.status    = null; 
		this.stats     = new Stats(this);
		this.id;
	}

	setStatus(status) {
		
		this.status = status;
		this.$element.find('.appel i').removeClass('selected');
		this.$element.find('.' + status).addClass('selected');
		$('#appel').find('#' + this.firstName+'_'+this.lastName).find('i').removeClass('selected');
		$('#appel').find('#' + this.firstName+'_'+this.lastName).find('.'+status).addClass('selected');
		data.setStudent(this);
		data.saveStudents();
	}
	
	getScore(){
		let s = 0;
		for (let stat in this.stats) {
			if (typeof this.stats[stat] !== 'number') {continue}
			s += this.stats[stat];
		}
		return s;
	}

	setStat(stat, value) {
		
		this.stats[stat] = value;
		this.$element.find('.' + stat + ' .statValue').html(value);
		this.setScore(this.getScore());

		data.setStudent(this);
		data.saveStudents();

	}

	modStat(stat, mod) {
		this.stats[stat] += mod;
		this.$element.find('.' + stat + ' .statValue').html(this.stats[stat]);
		this.setScore(this.getScore());

		data.setStudent(this);
		data.saveStudents();
	}

	setScore(value) {
		this.$element.find('.score').html(value + ' points')
	}
	
	toString() {
		return JSON.stringify(this)
	}
}