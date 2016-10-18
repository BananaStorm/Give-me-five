var $ = require('jQuery')
import Stats from './stats.class'

export default class Student {
	
	constructor (firstName, lastName, picture, color) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.picture = picture;
		this.color = color;
		this.stats = new Stats();
		this.id;
	}
}