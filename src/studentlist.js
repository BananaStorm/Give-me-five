// SPAGHETTI WARNING

import * as data from './data'
import Student from './student.class'

let students = [];
let columns = [];

// COLOR PALETTE
let availableColors = [
	'rgb(204, 51, 51)',
	'rgb(220, 94, 55)',
	'rgb(255, 184, 47)',
	'rgb(153, 153, 51)',
	'rgb(51, 204, 134)',
	'rgb(20, 153, 186)',
	'rgb(142, 115, 192)',
	'rgb(255, 102, 153)'
]

function init(list, id, col){
	
	students = list;
	let $template = $(id).find('.student').detach();
	
	// CREATE COLUMNS DEPENDING ON COL
	for (var i = 0; i < col; i++) {
		columns.push( $('<div>').addClass('col-md-' + 12/col).appendTo(id) )
	};

	// COL INDEX WILL BE USED TO DETERMINE WHICH COLUMN TO APPEND STUDENT IN
	let colIndex = 0;

	// SORT STUDENT LIST (alphabetical order lastName)
	sortBy.lastName();
	
	// CREATE AND APPEND HTML ELEMENT FOR EACH INSTANCE OF Student IN students
	for (var i = 0; i < students.length; i++) {
		
		let s = students[i];
		
		let $clone = createCardFrom($template, s);

		$clone.appendTo(columns[colIndex]);

		colIndex++;
		if (colIndex >= col) {
			colIndex = 0;
		}
	}

/////////////////////////////////////////////////////////////
//													       //
//  BE PREPARED FOR THE SUPER DIRTY on.('click') FIESTA !  //
//													       //
/////////////////////////////////////////////////////////////

	// ORDER ICONS ON CLICK
	$('.orderBy').on('click',function(){
		$('.orderBy').removeClass('selected');
		$(this).addClass('selected');
	})
	$('.sortByName').on('click', function(){
		reorderCards(sortBy.lastName, col);
	});
	$('.sortByScore').on('click', function(){
		reorderCards(sortBy.score, col);
	});
	$('.sortByColor').on('click', function(){
		reorderCards(sortBy.color, col);
	});

	// CREATE PALETTE 'ADD STUDENT' PANEL (depending on availableColors)
	let $colorTemplate = $('#add .color').detach();

	for (var i = 0; i < availableColors.length; i++) {
		$colorTemplate.clone().css('background-color', availableColors[i]).appendTo('#palette');
	}

	$('#add .color:first').addClass('selected');

	// 'ADD STUDENT' NAV ICON ON CLICK
	$('.addUser').on('click', function(){
		$(this).toggleClass('selected');
		if ($('#add').css('display') == 'none') {$('#add').slideDown()}
		else {$('#add').slideUp()}
		$('.appel').removeClass('selected')
		$('#appel').slideUp();
	})

	// COLOR SELECTOR ON CLICK
	$('#add').on('click', '.color', function(){
		$('#add .color').removeClass('selected');
		$(this).addClass('selected');
	});
	
	// CANCEL 'ADD STUDENT' ON CLICK
	$('#add .cancel').on('click', function(){
		$('#add').slideUp();
		$('.addUser').removeClass('selected');
	})

	// VALIDATE 'ADD STUDENT' ON CLICK : CREATE new Student + NEW HTML ELEMENT
	$('#add .validate').on('click', function(){

		let firstName = $('#add #firstName').val();
		let lastName  = $('#add #lastName').val();
		let picture   = $('#add #picture').val()
		if (picture.length == 0) {picture = null}
		let color     = $('#add .selected').css('background-color');

		let student = new Student(firstName, lastName, picture, color);
		students.push(student);
		let $card   = createCardFrom($template, student);
		columns[colIndex].append($card);
		colIndex++;
		if (colIndex >= col) {
			colIndex = 0;
		}
		$card.fadeIn(200);
		$('.addUser').removeClass('selected');
		$('#add').slideUp();
	})
};

// FONCTIONS DE TRI
let sortBy = {
	lastName : function(){
		students.sort(function(s1,s2){
			return s1.lastName.localeCompare(s2.lastName);
		})
	},
	score : function(){
		students.sort(function(s1, s2){
			return s2.getScore() - s1.getScore();
		})
	},
	color : function(){
		let r = [];
		for (var i = 0; i < availableColors.length; i++) {
			let sameColor = students.filter(function(s){
				console.log(availableColors[i], s.color); 
				return availableColors[i] == s.color;
			});
			r = r.concat(sameColor);
		}
		console.log(r);
		students = r;
	}
};

function getStudentByName(firstName, lastName) {
	let r = students.filter(function(s){
		return s.firstName == firstName && s.lastName == lastName;
	})
	return r[0];
}

// RE-ORDER HTML ELEMENTS DEPENDING ON students ARRAY
function reorderCards(sortFunction, col){
	
	let colIndex = 0;
	
		for (var i = 0; i < students.length; i++) {
			let student = students[i]
			student.$element.fadeOut(200, function(){
				student.$element.detach();
			})
		}

	sortFunction();

	setTimeout(function(){
		for (var i = 0; i < students.length; i++) {
			console.log(students[i].$element);
			columns[colIndex].append(students[i].$element);
			students[i].$element.delay(50*i).fadeIn(200);
			colIndex++;
			if (colIndex >= col) {
				colIndex = 0;
			}
		}		
	}, 400);

}

// CREATE HTML CARD FROM Student INSTANCE (SUPER DIRTY on.(click) FIEST AGAIN !!)
function createCardFrom($template, student){

	// CLONE + INFOS FROM ARG: student
	let $clone = $template.clone();
	$clone.attr('id', student.firstName +'_'+ student.lastName);
	$clone.find('.picture').attr('src', student.picture);
	$clone.find('.picture').on('error', function(){$(this).attr('src', 'images/userdefault.png')})
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

	// EXPAND STATS ON CLICK
	$clone.find('.expandStats').on('click', function(){
		$clone.find('.stats').toggle(400, function(){
			$clone.find('.expandStats').toggleClass('open');
		});
	})

	// PRESENCE
	$clone.find('.present').on('click', function(){
		student.setStatus('present');
		$('#appel .status i').removeClass('selected');
		$('#appel #' +student.firstName+'_'+student.lastName).find('.present').addClass('selected');
	})

	$clone.find('.late').on('click', function(){
		student.setStatus('late');
		$('#appel .status i').removeClass('selected');
		$('#appel #' +student.firstName+'_'+student.lastName).find('.late').addClass('selected');
	})

	$clone.find('.absent').on('click', function(){
		student.setStatus('absent');
		$('#appel .status i').removeClass('selected');
		$('#appel #' +student.firstName+'_'+student.lastName).find('.absent').addClass('selected');
	})

	// ON CLICK ON EDIT ICON
	$clone.find('.editIcon').on('click', function(){
		
		$(this).slideUp();
		$clone.find('.validateIcon').slideDown();
		$clone.find('.edit').slideDown();
		//$clone.find('.editColor').css('display', 'flex');
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