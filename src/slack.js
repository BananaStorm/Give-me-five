let token = 'xoxp-86302774640-87013896737-92771216278-2c1b2a344a91f24cddd799c17b4b5bb5';
let groupID = 'G2J97PBUP';
var $ = require('jQuery');

let profiles = [];

function getMembersInfos(callback, tk = token, grpId = groupID){
	
	$.ajax(
			'https://slack.com/api/groups.info?token=' + tk + '&channel=' + grpId + '&pretty=1'
	).done(function(data){
		
		let members = data.group.members;
		
		for (let i = 0; i < members.length; i++) {
			$.ajax(
				'https://slack.com/api/users.info?token=' + tk + '&user=' + members[i] + '&pretty=1'
			).done(function(data){
				let member = {}
				let slackProfile = data.user.profile
				member.firstName = slackProfile.first_name;
				member.lastName = slackProfile.last_name;
				member.picture = slackProfile.image_192;
				member.id = data.user.id;

				profiles.push(member);
			})
		}

		if (callback) {
			callback(profiles);
		}
		
	});
}

export {profiles, getMembersInfos}