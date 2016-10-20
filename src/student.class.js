var $ = require('jQuery')
import Stats from './stats.class'

export default class Student {
	
	constructor (firstName, lastName, picture, color) {
		this.firstName = firstName;
		this.lastName  = lastName;
		this.picture   = picture;
		this.color     = color;
		this.status    = null; 
		this.stats     = new Stats(this);
		this.id;
	}

	setStatus(status) {
		this.status = status;
		this.$element.find('.appel i').removeClass('selected');
		this.$element.find('.' + status).addClass('selected');
	}

	toString() {
		return JSON.stringify(this)
	}
}