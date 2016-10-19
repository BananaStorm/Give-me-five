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
		let $clone = $template.clone();
		$clone.attr('id', s.firstName + s.lastName);
		$clone.find('.picture').attr('src', s.picture);
		$clone.find('.firstName').html(s.firstName);
		$clone.find('.lastName').html(s.lastName);
		$clone.find('.name').css('background-color', s.color);
		
		
		let $statClone = $clone.find('.stat').detach();
		
		for (let stat in s.stats) {

			if (typeof s.stats[stat] !== 'number') {continue}
			let statName  = stat;
			let statValue = s.stats[stat];
			
			let $stat = $statClone.clone()
			$stat
			.addClass(statName)
			.appendTo($clone.find('ul'));
			
			$stat.children('.statName').html( statName + ' : ')
			$stat.children('.statValue').html( statValue )

			$stat.children('.minus').on('click', function(){
				s.stats.modValue(statName, -1);
			})

			$stat.children('.plus').on('click', function(){
				s.stats.modValue(statName, 1);
			})
			
		}

		$clone.find('.expandStats').on('click', function(){
			$clone.find('.stats').toggle(400, function(){
				$clone.find('.expandStats').toggleClass('open');
			});
		})

		$clone.find('.present').on('click', function(){
			s.setStatus('present');
			console.log(s);
		})

		$clone.find('.late').on('click', function(){
			s.setStatus('late');
			console.log(s);
		})

		$clone.find('.absent').on('click', function(){
			s.setStatus('absent');
			console.log(s);
		})

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

export {students, init, hide}