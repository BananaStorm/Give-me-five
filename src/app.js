import Student from './student.class'
import * as list from './studentlist'





// list.init(students)
// console.log(list)

//let me = new Student('Clément', 'Dussol');

let GiveMeFive = {
	
	studentsList : list,
	
	init: function(){
		
		let students = [

			new Student('Clément', 'Dussol'),
			new Student('Clément', 'Teboul')
		];
		
		this.studentsList.init(students, "#students");

	}
}
GiveMeFive.init()
console.log(GiveMeFive)


