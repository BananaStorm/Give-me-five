import * as data from './data'
import Student from './student.class'

let students = [];

let availableColors = [
	'#cc3333',
	'#dc5e37',
	'#ffb82f',
	'#999933',
	'#33cc86',
	'#1499ba',
	'#8e73c0',
	'#ff6699'
]

function init(list, id, col){
	
	students = list;
	let $template = $(id).find('.student').detach();
	
	let columns = [];
	for (var i = 0; i < col; i++) {
		columns.push( $('<div>').addClass('col-md-' + 12/col).appendTo(id) )
	};

	let colIndex = 0;

	sortBy.lastName();
	
	for (var i = 0; i < students.length; i++) {
		
		let s = students[i];
		
		let $clone = createCardFrom($template, s);

		$clone.appendTo(columns[colIndex]);

		colIndex++;
		if (colIndex >= col) {
			colIndex = 0;
		}
	}

	let $colorTemplate = $('#add .color').detach();

	for (var i = 0; i < availableColors.length; i++) {
		$colorTemplate.clone().css('background-color', availableColors[i]).appendTo('#palette');
		
	}

	$('.addUser').on('click', function(){
		if ($('#add').css('display') == 'none') {$('#add').slideDown()}
		else {$('#add').slideUp()}
	})


	$('#add').on('click', '.color', function(){
		$('#add .color').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$('#add .cancel').on('click', function(){
		$('#add').slideUp();
	})

	$('#add .validate').on('click', function(){

		let firstName = $('#add #firstName').val();
		let lastName  = $('#add #lastName').val();
		let picture   = $('#add #picture').val()
		if (picture.length == 0) {picture = null}
		let color     = $('#add .selected').css('background-color');

		let student = new Student(firstName, lastName, picture, color);
		let $card   = createCardFrom($template, student);
		columns[colIndex].append($card);
		colIndex++;
		if (colIndex >= col) {
			colIndex = 0;
		}
		$card.fadeIn(400);
		$('#add').slideUp();
	})
};

let sortBy = {
	lastName : function(){
		students.sort(function(s1,s2){
			return s1.lastName.localeCompare(s2.lastName);
		})
	},
	score : function(){
		students.sort(function(s1, s2){
			return s1.getScore() - s2.getScore();
		})
	}
};

function getStudentByName(firstName, lastName) {
	let r = students.filter(function(s){
		return s.firstName == firstName && s.lastName == lastName;
	})
	return r[0];
}

function createCardFrom($template, student){

	// CLONE + INFOS FROM ARG: student
	let $clone = $template.clone();
	$clone.attr('id', student.firstName +'_'+ student.lastName);
	$clone.find('.picture').attr('src', student.picture);
	$clone.find('.firstName').html(student.firstName);
	$clone.find('.lastName').html(student.lastName);
	$clone.find('.name').css('background-color', student.color);
	
	student.$element = $clone;

	// FILL COLOR PALETTE
	let $colorTemplate = $clone.find('.editColor .color').detach();
	for (var i = 0; i < availableColors.length; i++) {
		let $colorClone = $colorTemplate.clone().css('background-color', availableColors[i]);
		$colorClone.on('click', function(){
			$clone.find('.edit input').css('background-color', $(this).css('background-color'))
		})
		$clone.find('.editColor').append($colorClone);
		
	}
	
	// FILL SCORE
	student.setScore(student.getScore());
	
	// FILL STATS
	let $statClone = $clone.find('.stat').detach();
	
	for (let stat in student.stats) {

		if (typeof student.stats[stat] !== 'number') {continue}
		let statName  = stat;
		let statValue = student.stats[stat];
		
		let $stat = $statClone.clone()
		$stat
		.addClass(statName)
		.appendTo($clone.find('ul'));
		
		$stat.children('.statName').html( statName + ' : ')
		$stat.children('.statValue').html( statValue )

		$stat.children('.minus').on('click', function(){
			student.modStat(statName, -1);
		})

		$stat.children('.plus').on('click', function(){
			student.modStat(statName, 1);
		})
	}

	$clone.find('.expandStats').on('click', function(){
		$clone.find('.stats').toggle(400, function(){
			$clone.find('.expandStats').toggleClass('open');
		});
	})

	// PRESENCE
	$clone.find('.present').on('click', function(){
		student.setStatus('present');
	})

	$clone.find('.late').on('click', function(){
		student.setStatus('late');
	})

	$clone.find('.absent').on('click', function(){
		student.setStatus('absent');
	})

	// ON CLICK ON EDIT ICON
	$clone.find('.editIcon').on('click', function(){
		
		$(this).slideUp();
		$clone.find('.validateIcon').slideDown();
		$clone.find('.edit').slideDown();
		$clone.find('.editColor').css('display', 'flex');
		$clone.find('.name').slideUp();
		$clone.find('.editfirstName').focus().val(student.firstName);
		$clone.find('.editlastName').val(student.lastName);
		$clone.find('.edit input').css('background-color', student.color);

	})

	// ON CLICK ON VALIDATE ICON
	$clone.find('.validateIcon').on('click', function(){
		
		$(this).slideUp();
		$clone.find('.edit').slideUp();
		$clone.find('.name').slideDown();
		$clone.find('.editIcon').slideDown();
		$clone.find('.edit').slideUp();

		let firstName = $clone.find('.editfirstName').val();
		let lastName  = $clone.find('.editlastName').val();		
		let color     = $clone.find('.edit input').css('background-color');

		if (firstName != student.firstName || lastName != student.firstName) {
			delete data.students[student.firstName+'_'+student.lastName];
		}

		student.firstName = firstName;
		student.lastName  = lastName;
		student.color     = color;
		
		data.setStudent(student);
		data.saveStudents();
		
		$clone.find('.firstName').html(firstName);
		$clone.find('.lastName').html(lastName);
		$clone.find('.name').css('background-color', color);

	})

	return $clone;

}

export {students, init, getStudentByName}