var $ = require('jQuery')

let students = [];

function init(list, id){
	
	students = list;
	let $template = $(id).children().detach();
	
	for (var i = 0; i < students.length; i++) {
		
		let s = students[i];
		let $clone = $template.clone();
		$clone.attr('id', s.firstName + s.lastName)
		$clone.find('.firstName').html(s.firstName);
		$clone.find('.lastName').html(s.lastName);
		$clone.find('.score').html(s.stats.getScore() + " pts");
		$clone.appendTo(id);
		s.id = i;

	}
};

export {students, init}