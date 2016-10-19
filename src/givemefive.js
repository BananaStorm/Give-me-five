import Student from './student.class'
import * as studentsList from './studentlist'
import * as slack from './slack'

function init(){
	$('.loader').fadeIn(500);
	let s = [];

	// Appel de getMembersInfos avec comme argument la fonction de callback qui sera appelée quand toutes mes requetes seront terminées
	slack.getMembersInfos(function(profiles){
		
		// Pour chaque profil récupéré par mes requetes, on crée une instance de Student		
		for (var i = 0; i < profiles.length; i++) {
			let p = profiles[i];
			s.push(new Student(p.firstName, p.lastName, p.picture, p.color))
		}
		// on initie studentsList en passant la liste des instances de Student
		studentsList.init(s, "#students", 4);
		onAppLoaded();
		console.log(studentsList)

		//studentsList.hide(studentsList.students[0]);
	});
	
}

init();

function onAppLoaded(){
	$('#loaderContainer').fadeOut(500, function(){
		$('body').css('overflow', 'auto');
		for (var i = 0; i < studentsList.students.length; i++) {
			studentsList.students[i].$element.delay(i*200).fadeIn(400);
		}
	});
}

