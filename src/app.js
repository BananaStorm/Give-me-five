import Student from './student.class'
import * as list from './studentlist'
var $ = require('jQuery')





// list.init(students)
// console.log(list)

//let me = new Student('Clément', 'Dussol');

let GiveMeFive = {
	
	students : list,
	
	init: function(){
		
		let students = [

			new Student('Clément', 'Dussol'),
			new Student('Clément', 'Teboul')
		];
		this.students.init(students);		
	}
}
GiveMeFive.init()
console.log(GiveMeFive)


