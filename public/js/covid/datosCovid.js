window.onload = function () {
	getCovidStats();
}

function getCovidStats() {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/92')
		.then(function (resp) { return resp.json() })
		.then(function (data) {
			let population = data.location.country_population;
			let update = data.location.last_updated;
			let confirmedCases = data.location.latest.confirmed;
			let deaths = data.location.latest.deaths;
			document.getElementById('cases').innerHTML += confirmedCases.toLocaleString('en');

			document.getElementById('cases').innerHTML += ` <i class="fas fa-head-side-cough"></i>`;
			document.getElementById('deaths').innerHTML += deaths.toLocaleString('en');
			document.getElementById('deaths').innerHTML += ` <i class="fas fa-skull-crossbones"></i>`;
			document.getElementById('population').innerHTML += population.toLocaleString('en');
			document.getElementById('population').innerHTML += ` <i class="fas fa-user-friends"></i>`;

			document.getElementById('update').innerHTML += update.substr(0, 10);
			document.getElementById('percent').innerHTML += ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";

			document.getElementById('estadisticas').classList.add('active');


		})
		.catch(function () {
			console.log("error");
		})
	setTimeout(getCovidStats, 43200000) // update every 12 hours
}