// SPAGHETTI WARNING

import * as list from './studentlist';
import * as data from './data'
let moment = require('moment')
export let checked = false;
export function init(){

	// APPEL STORED IN LOCAL STORAGE ?
	if(data.exists('appel')) {
		// YES : COMPARE DAY
		let day = data.getAppel('day');
		let today = moment().format('DD/MM/YYYY');

		// TODAY ? : COMPARE HOUR
		if (day == today) {
			let hour = parseInt(data.getAppel('hour'));
			console.log(data.getAppel());
			let now  = parseInt(moment().format('HH'));

			if (hour <= 12 && hour >= 9 && now <= 12 && now >= 9
			||  hour <= 17 && hour >= 13 && now <= 23 && now >= 13) {
				checked = true;
			} else {
				checked = false;
			}
		}
	}

	// DETACH TEMPLATE APPEL PANEL LINE
	let $template = $('#appel').find('.studentStatus').detach();

	// FOR EACH STUDENT IN LIST.STUDENT
	for (var i = 0; i < list.students.length; i++) {
		
		// CLONE TEMPLATE
		let s = list.students[i];
		let $clone = $template.clone();

		// INJECT INFO FROM USER
		$clone.find('.firstName').html(s.firstName);
		$clone.find('.lastName').html(s.lastName);
		$clone.attr('id', s.firstName+'_'+s.lastName);

		// PRESENCE BUTTONS ON CLICK (DIRTY)
		$clone.find('.present, .late, .absent').on('click', function(){
			$clone.find('.present, .late, .absent').removeClass('selected');
			let classes = $(this).attr('class').split(' ');
			let className = classes[classes.length-1];
			console.log(className);
			$(this).addClass('selected');
			let nameArray = $clone.attr('id').split('_')
			list.getStudentByName(nameArray[0], nameArray[1]).setStatus(className);
		})

		// if (s.status) {
		// 	$clone.find('.' + s.status).addClass('selected');
		// }

		$clone.appendTo('#status');
	}

	// IF APPEL ALREADY DONE
	if (checked) {
		// GET APPEL DATA (STUDENTS PRESENCE STATUS)
		let appelData = data.getAppel();
		for (let studentName in appelData.students) {
			let nameArray = studentName.split('_');
			let student = list.getStudentByName(nameArray[0], nameArray[1]);
			let status = appelData.students[studentName]
			student.setStatus(status);
			$('#appel .state').addClass('checked').find('span').html('validé le ' + appelData.day + ' à ' + appelData.hour + 'h');
			console.log(studentName);
			$('#appel #' + studentName).find('.' + status).addClass('selected');
		}
	// ELSE : APPEL STATE 'en attente de validation'
	} else {
		$('#appel .state').find('span').html('en attente de validation');
	}

	// NAV ICON ON CLICK 
	$('nav .appel').on('click', function(){
		$(this).toggleClass('selected');
		if ($('#appel').css('display') == 'none') {$('#appel').slideDown()}
		else {$('#appel').slideUp()}
		$('.addUser').removeClass('selected')
		$('#add').slideUp();
	})

	// VALIDATE APPEL BUTTON ON CLICK
	$('#appel .validate').on('click', function(){
		if (!checked) {
			processAppel();
			checked = true;
			$('#appel .state').addClass('checked').find('span').html('validé le ' + moment().format('DD/MM/YYYY') + ' à ' + moment().format('HH'));
			data.setAppel(list.students);
			data.saveAppel();
		}
	})
}

// PROCESS APPEL AND GIVE POINTS TO STUDENTS ACCORDING ON THEIR PRESENCE STATE (present|late|absent);
function processAppel(){
	for (var i = 0; i < list.students.length; i++) {
		let s = list.students[i];
		switch (s.status) {
			case 'present':
				s.modStat('presence', 10);
				break;
			case 'late':
				s.modStat('presence', -2);
				break;
			case 'absent':
				s.modStat('presence', -10);
				break;
			case null:
				s.modStat('presence', -10);
				break;
		}
	}
}