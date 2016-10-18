import Student from './student.class'
import * as studentsList from './studentlist'
import * as slack from './slack'
var $ = require('jQuery');
	
function init(){
		
	let s = [

		new Student('Clément', 'Dussol'),
		new Student('Clément', 'Teboul')
	];
	
	studentsList.init(s, "#students");
}

init()
console.log(slack);
slack.getMembersInfos(function(p){
	console.log(p)
});

