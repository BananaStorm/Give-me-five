var $ = require('jQuery')

let students = [];
function init(list, id){
	
	students = list;
	let $template = $(id).children().detach();
	
	for (var i = 0; i < students.length; i++) {
		
		let s = students[i];
		let $clone = $template.clone();
		$clone.children('.firstName').html(s.firstName);
		$clone.children('.lastName').html(s.lastName);
		$clone.children('.score').html(s.score);
		$clone.appendTo(id);

	}
};

export {students, init}