import Student from './student.class'
import * as list from './studentlist'

	
let	students = list;
	
function init(){
		
	let s = [

		new Student('Clément', 'Dussol'),
		new Student('Clément', 'Teboul')
	];
	
	students.init(s, "#students");
	console.log(students)
}
init()
console.log('coucou');


