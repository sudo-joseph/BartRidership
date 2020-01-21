//// TODO: Extract year and month data from json.
let years = ["2019","2018","2017","2016","2015","2014",
             "2015","2014","2013","2012","2011"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
             ];

let stations = {
  "12TH": "12th Street / Oakland City Center",
  "16TH": "16th Street Mission",
  "19TH": "19th Street Oakland",
  "24TH": "24th Street Mission",
  "ASHB": "Ashby",
  "BAYF": "Bayfair",
  "DBRK": "Berkeley",
  "BALB": "Balboa Park",
  "CIVC": "Civic Center",
  "COLS": "Coliseum",
  "COLM": "Colma",
  "CONC": "Concord",
  "CAST": "Castro Valley",
  "DALY": "Daly City",
  "DUBL": "Dublin/Pleasanton",
  "EMBR": "Embarcadero",
  "DELN": "El Cerrito Del Norte",
  "PLZA": "El Cerrito Plaza",
  "FRMT": "Fremont",
  "FTVL": "Fruitvale",
  "GLEN": "Glen Park",
  "HAYW": "Hayward",
  "LAFY": "Lafayette",
  "LAKE": "Lake Merritt",
  "MCAR": "MacArthur",
  "MLBR": "Millbrae",
  "MONT": "Montgomery Street",
  "NBRK": "North Berkeley",
  "NCON": "North Concord",
  "OAKL": "Oakland Int. Airport",
  "ORIN": "Orinda",
  "WOAK": "West Oakland",
  "PHIL": "Pleasant Hill",
  "POWL": "Powell Street",
  "RICH": "Richmond",
  "ROCK": "Rockridge",
  "SBRN": "San Bruno",
  "SHAY": "South Hayward",
  "SANL": "San Leandro",
  "SFIA": "San Francisco Int. Airport",
  "SSAN": "South San Francisco",
  "UCTY": "Union City",
  "WCRK": "Walnut Creek",
  "WDUB": "West Dublin/Pleasanton",
  "PITT": "Pittsburg/Bay Point",
  "WARM": "Warm Springs",
  "ANTC": "Antioch",
  "BERY": "Berryessa",
  "MLPT": "Milpitas",
  "PCTR": "Pittsburg Center"};

let data = {
    "ridership_data": {},
    "arrival_data":[],
    "depart_data":[],
    "station": ''};
//update with empty values after render function is working.

init();

function init() {
  addYears()
  addMonths();
  addStation();
  addListeners();
  fetchData();
}

function fetchData() {
  fetch("./data/ridership_data.json")
  .then(response => response.json())
  .then(json_data => {
    data.ridership_data=json_data;
    getGraphData()
  })
}

function addYears() {
  let dropdown = document.querySelector(".Content-Dataview-Controls-Year");
  for (year of years) {
    let option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    option.className += 'Content-Dataview-Controls-Option';
    dropdown.appendChild(option);
  }
}

function addMonths() {
  let dropdown = document.querySelector(".Content-Dataview-Controls-Month");
  for (month of months) {
    let option = document.createElement("option");
    option.value = month;
    option.textContent = month;
    option.className += 'Content-Dataview-Controls-Option';
    dropdown.appendChild(option);
  }
}

function addStation() {
  let dropdown = document.querySelector(".Content-Dataview-Controls-Station");
  for (const [stnabr, station] of Object.entries(stations)) {
    let option = document.createElement("option");
    option.value = stnabr;
    option.textContent = station;
    option.className += 'Content-Dataview-Controls-Option';
    dropdown.appendChild(option);
  }
}

function addListeners() {
  let controls = document.querySelector(".Content-Dataview-Controls")
  for (child of controls.children) {
      child.addEventListener("change", getGraphData);
  }
}

function getGraphData() {
  let station = document.querySelector(".Content-Dataview-Controls-Station").value;
  data.station = stations[station];
  let year = document.querySelector(".Content-Dataview-Controls-Year").value;
  let month = document.querySelector(".Content-Dataview-Controls-Month").value;
  let dayofWeek = document.querySelector(".Content-Dataview-Controls-DayofWeek").value;
  let scaleFactor = 200/15000;
  //200px = 100000 riders. Need to update once switch to average daily ridership.
  let arriving = data.ridership_data[year][month][station]['arriving'][dayofWeek];
  let departing = data.ridership_data[year][month][station]['departing'][dayofWeek]

  data.arrival_data = arriving.map(x => Math.round(x*scaleFactor));
  data.depart_data = departing.map(x => Math.round(x*scaleFactor));
  render()
}

function render() {
  let title = document.querySelector(".Content-Title");
  title.innerHTML = `<h3> ${data.station} Station Arriving and Departing Passengers</h3>
                       <h4> (Average Monthly Pax per Hour)</h4>`;

  let arrival = document.querySelector(".Content-Dataview-Top");
  arrival.innerHTML = '';
  for (hour of data.arrival_data) {
    let div = document.createElement("div");
    div.className += 'Content-Dataview-Data-Box';
    div.style.setProperty('height', hour + 'px');
    arrival.appendChild(div);
  };

  let depart = document.querySelector(".Content-Dataview-Bottom");
  depart.innerHTML = '';
  for (hour of data.depart_data) {
    let div = document.createElement("div");
    div.className += 'Content-Dataview-Data-Box';
    div.style.setProperty('height', hour + 'px');
    depart.appendChild(div);
  };
}


// class="Content-Dataview-Data-Box
