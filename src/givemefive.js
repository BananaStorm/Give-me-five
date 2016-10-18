import Student from './student.class'
import * as studentsList from './studentlist'
import * as slack from './slack'
var $ = require('jQuery');

function init(){
	
	let s = [];

	// Appel de getMembersInfos avec comme argument la fonction de callback qui sera appelée quand toutes mes requetes seront terminées
	slack.getMembersInfos(function(profiles){
		
		// Pour chaque profil récupéré par mes requetes, on crée une instance de Student		
		for (var i = 0; i < profiles.length; i++) {
			let p = profiles[i];
			s.push(new Student(p.firstName, p.lastName, p.picture, p.color))
		}
		// on initie studentsList en passant la liste des instances de Student
		studentsList.init(s, "#students");
	});
	
}

init();
