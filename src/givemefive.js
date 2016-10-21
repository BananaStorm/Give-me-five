// SUPER SPAGHETTI CODE BY CLEMENT DUSSOL
// IT'S UGLY BUT IT WORKS

import Student from './student.class'
import * as list  from './studentlist'
import * as data  from './data'
import * as appel from './appel'

function init(){

	$('.loader').fadeIn(500);

// STUDENT LIST
	let studentsList = [];
	// IS THERE SOMETHING IN LOCAL STORAGE ?
	if (data.exists('students')) {

		console.log('data found');
		// YES : RETRIEVE DATA
		let studentsData = data.getStudents();
		for (var i = 0; i < studentsData.length; i++) {
			let newStudent = dataToStudent(studentsData[i]);
			data.setStudent(newStudent);
			studentsList.push(newStudent);
		}

		console.log(studentsData);
	} else {
		// NO : NO DATA FOUND
		console.log('no data found')
	}
	// INIT LIST
	list.init(studentsList, '#students', 4);

// APPEL 
	
	// IS THERE SOMETHING IN LOCAL STORAGE ?
		// YES : RETRIEVE DATA
		// NO : NO DATA FOUND
	
	// INIT APPEL
	appel.init();
	onAppLoaded();
}

init();

function onAppLoaded(){
	$('#loaderContainer').fadeOut(500, function(){
		$('body').css('overflow', 'auto');
		for (var i = 0; i < list.students.length; i++) {
			list.students[i].$element.delay(i*200).fadeIn(400);
		}
	});
}

function dataToStudent(data) {
	
	let s = new Student();
	
	for (let prop in data) {

		if (s.hasOwnProperty(prop) && typeof data[prop] != 'object') {
			s[prop] = data[prop];
		}
		if (prop == 'stats') {
			for (let stat in data['stats']) {
				s.stats[stat] = data['stats'][stat]
			}
		}
	}
	return s
}

