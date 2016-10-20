let appel;
let students;

export function init(){
	
	let storedStudents = localStorage.getItem('students')
	if (storedStudents) {
		students = getStudents();
	}
}

export function saveStudents(){
	localStorage.setItem('students', JSON.stringify(students));
}

export function getStudents(){
	let result = [];
	
	let obj = JSON.parse(localStorage.getItem('students'));
	for (let student in obj) {
		obj[student] = JSON.parse(obj[student]);
		result.push(obj[student]);
	}

	return obj;
}

export function setStudent(student) {
	students[student.firstName + '_' + student.lastName] = student.toString();
}