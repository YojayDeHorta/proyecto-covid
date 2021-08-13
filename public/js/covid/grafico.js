const countysSelectElement = document.querySelector(".country_options");
let currentCountry;
const chartDiv = document.getElementById("chartDiv");
const chartDivMuertes = document.getElementById("chartDivMuertes");

function displaychart(data) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute("id", "myChart");
    canvas.setAttribute("class", "reveal-left");
    var delayed;
    chartDiv.appendChild(canvas);
    const dailyCases = data.map((day, index) => {
        if (index) return Math.abs(day.Confirmed - data[index - 1].Confirmed);
        else day.Confirmed;
    });
    const dailyc = data.map((day, Date) => {
        var str = day.Date;
        day.Date = str.substring(0, 10);

    });


    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(day => day.Date),
            datasets: [{
                label: 'Casos Diarios',
                backgroundColor: '#BEFEFF',
                borderColor: '#00bec1',
                data: dailyCases,
                pointRadius: 0,
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 10 + context.datasetIndex * 5;
                    }
                    return delay;
                }
            },

        }
    });

}


function getCovidData() {

    const endpoint = `https://api.covid19api.com/dayone/country/Colombia`
    fetch(endpoint).then(response => response.json())
        .then(data => {

            displaychart(data);
        })
        .catch(err => console.warn(err))
}
getCovidData();
function getCovidDeaths() {


    fetch("https://api.covid19api.com/country/colombia?from=2021-06-18T00:00:00Z&to=2021-08-13T00:00:00Z").then(response => response.json())
        .then(data => {

            displaydeaths(data);
        })
        .catch(err => console.warn(err))
}
getCovidDeaths();

function displaydeaths(data) {
    var delayed;
    const canvasdeath = document.createElement('canvas');
    canvasdeath.setAttribute("id", "myChartdeath");
    canvasdeath.setAttribute("class", "reveal-right");
    chartDivMuertes.appendChild(canvasdeath);
    const dailyCases = data.map((day, index) => {
        if (index) return Math.abs(day.Deaths - data[index - 1].Deaths);
        else day.Deaths;
    });
    const dailyc = data.map((day, Date) => {
        var str = day.Date;
        day.Date = str.substring(5, 10);

    });
    var ctx = document.getElementById('myChartdeath').getContext('2d');
    var chartdeath = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(day => day.Date),
            datasets: [{
                label: 'Muertes Diarias ',
                backgroundColor: '#F09BBA',
                borderColor: '#F09BBA',
                data: dailyCases,
                pointRadius: 0,
                borderWidth: 1,
                fill: true,

                datalabels: {
                    rotation: [90]
                }
            }],
        },

        options: {
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 30 + context.datasetIndex * 10;
                    }
                    return delay;
                }
            },

        }
    });
}
/*function getCountries() {
    const endpoint = "https://api.covid19api.com/countries";
    fetch(endpoint).then(Response => Response.json())
        .then(countries => {


            getCovidData();
        })
        .catch(err => console.warn(err))

}
getCountries();

countysSelectElement.addEventListener("click", () => {
    const currentIndex = countysSelectElement.selectedIndex;
    const countrySelected = countysSelectElement.children[currentIndex].value;
    currentCountry = countrySelected;
    getCovidData(countrySelected);
})*/