// PLEASE DONT READ THIS

let moment = require('moment');

let appel = {
	day 	 : '',
	hour 	 : '',
	students : {}
}
export let students = {};

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

	return result;
}

export function exists(name) {
	if (!localStorage.getItem(name)) {return false};
	return true;
}

export function setStudent(student) {
	students[student.firstName + '_' + student.lastName] = student.toString();
}

export function setAppel(students){
	appel.day  = moment().format('DD/MM/YYYY');
	appel.hour = moment().format('HH');
	for (var i = 0; i < students.length; i++) {
		let s = students[i];
		appel.students[s.firstName+'_'+s.lastName] = s.status;
	}
}

export function saveAppel(){
	localStorage.setItem('appel', JSON.stringify(appel));
}

export function getAppel(prop) {
	let appelData = JSON.parse(localStorage.getItem('appel'));
	if (prop) {return appelData[prop]} else {return appelData}
}