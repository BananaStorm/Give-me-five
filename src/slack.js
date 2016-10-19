import * as secret from './slack.private'

let profiles = [];

function getCode(){
	let query = window.location.search.substring(1);
	if (query.length == 0) {
		return query.length;
	}
	let vars  = query.split('&');
	let pairs = {} 
	for (var i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		pairs[pair[0]] = pair[1];
	}
	return pairs;
}

function getMembersInfos(callback, tk = secret.token, grpId = secret.groupID){
	
	// Première requete pour recupérer les ID
	$.ajax(
			'https://slack.com/api/groups.info?token=' + tk + '&channel=' + grpId + '&pretty=1'
	).done(function(data){

		// Quand elle est finie, on stock les id dans un tableau
		let ids = data.group.members;
		let requests = []; 
		
		// Pour chaque élément du tableau ids
		for (let i = 0; i < ids.length; i++) {
			// On lance une requete pour recupérer les infos de l'utilisateur grace a son id et on ajout la requete au tableau requests
			requests.push($.ajax(
				'https://slack.com/api/users.info?token=' + tk + '&user=' + ids[i] + '&pretty=1'
			).done(function(data){

				if (!data.user.is_admin) {

					//Quand cette requete est terminée, on crée un objet qui va accueillir les informations de chaque utilisateur
					let member = {}
					let slackProfile = data.user.profile
					
					member.firstName = slackProfile.first_name;
					member.lastName  = slackProfile.last_name;
					member.picture   = slackProfile.image_192;
					member.id        = data.user.id;
					member.color     = '#' + data.user.color;

					//console.log(data);

					// On l'ajoute au tableau profiles
					profiles.push(member);					
				}

			}))
		}

		// Quand toutes les requetes contenues dans requests sont terminées
		$.when.apply($, requests).then(function(){
			// On appelle le callback en passant notre liste d'objets utilisateurs (profiles)
			if (callback) {
				callback(profiles)
			}
		})
	});
}

export {profiles, getCode, getMembersInfos}