import * as data from './data'

let students = [];

function init(list, id, col){
	
	students = list;
	let $template = $(id).find('.student').detach();
	
	let columns = [];
	for (var i = 0; i < col; i++) {
		columns.push( $('<div>').addClass('col-md-' + 12/col).appendTo(id) )
	};
	console.log(columns)
	let colIndex = 0;

	sortBy.lastName();
	
	for (var i = 0; i < students.length; i++) {
		
		let s = students[i];
		//let $clone = $template.clone();
		
		let $clone = createCardFrom($template, s);

		s.id = i;
		s.$element = $clone;
		s.stats.setScore(s.stats.getScore());

		$clone.appendTo(columns[colIndex]);

		colIndex++;
		if (colIndex >= col) {
			colIndex = 0;
		}
	}
};

function hide(student) {
	student.$element.find('.student').transition({
		scale: 0,
		//perspective: '100px',
  		rotateY: '90deg'
	}, 400, 'ease');
}

function show(student) {
	student.$element.find('.student')
	.transition({
		scale: [0.8, 1.2]
	})
	.transition({
		scale: [1.2, 0.8]
	})
	.transition({
		scale: [1, 1]
	})
}

let sortBy = {
	lastName : function(){
		students.sort(function(s1,s2){
			return s1.lastName.localeCompare(s2.lastName);
		})
	},
	score : function(){
		students.sort(function(s1, s2){
			return s1.stats.getScore() - s2.stats.getScore();
		})
	}
};

function createCardFrom($template, student){

	let $clone = $template.clone();
	$clone.attr('id', student.firstName + student.lastName);
	$clone.find('.picture').attr('src', student.picture);
	$clone.find('.firstName').html(student.firstName);
	$clone.find('.lastName').html(student.lastName);
	$clone.find('.name').css('background-color', student.color);
	
	
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
			student.stats.modValue(statName, -1);
		})

		$stat.children('.plus').on('click', function(){
			student.stats.modValue(statName, 1);
		})
		
	}

	$clone.find('.expandStats').on('click', function(){
		$clone.find('.stats').toggle(400, function(){
			$clone.find('.expandStats').toggleClass('open');
		});
	})

	$clone.find('.present').on('click', function(){
		student.setStatus('present');
		console.log(student);
	})

	$clone.find('.late').on('click', function(){
		student.setStatus('late');
		console.log(student);
	})

	$clone.find('.absent').on('click', function(){
		student.setStatus('absent');
		console.log(student);
	})

	return $clone;

}

export {students, init, hide}