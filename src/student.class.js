var $ = require('jQuery')
import Stats from './stats.class'

export default class Student {
	
	constructor (firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.stats = new Stats();
		this.id;
	}
}