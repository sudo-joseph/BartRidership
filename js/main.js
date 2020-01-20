let years = ["2019"];
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
    "arrival_data": [1173, 19, 0, 0, 0, 4579, 17649, 43350, 60828, 37016, 14102, 9107, 8734, 8207, 8442, 9884, 14301, 22133, 18904, 11124, 6956, 5003, 4668, 2209],
    "depart_data": [617, 165, 0, 0, 2, 1127, 4539, 11820, 20924, 18142, 10802, 9045, 10347, 10063, 11276, 19119, 39175, 65068, 39093, 15905, 6551, 4026, 2955, 1716],
    "station": stations['12TH']};
//update with empty values after render function is working.

init();

function init() {
  fetchData();
  addMonths();
  addStation();
  addListeners();
  getGraphData()
}

function fetchData() {
  fetch("./data/ridership_data.json")
  .then(response => response.json())
  .then(json_data => {
    data.ridership_data=json_data;
  })
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
  let station = document.querySelector(".Content-Dataview-Controls-Station");
  data.station = stations[station.value];
  let year = document.querySelector(".Content-Dataview-Controls-Year");
  let month = document.querySelector(".Content-Dataview-Controls-Month");
  let dayofWeek = document.querySelector(".Content-Dataview-Controls-DayofWeek");
  console.log('something')
  console.log(data.ridership_data)

  data.arrival_data = []
  data.depart_data = []
  render()
}

function render() {
  let arrival = document.querySelector(".Content-Dataview-Top")
  let depart = document.querySelector(".Content-Dataview-Bottom")
  let title = document.querySelector(".Content-Title")
  // for (hour of data.arrival_data) {
  //   let div = document.createElement("div");
  //   div.className += 'Content-Dataview-Data-Box';
  //   div.style.setProperty('height', hour + 'px')
  //   arrival.appendChild(div)
  // }
  // for (hour of data.depart_data) {
  //   let div = document.createElement("div");
  //   div.className += 'Content-Dataview-Data-Box';
  //   div.style.setProperty('height', hour + 'px')
  //   depart.appendChild(div)
  // }
  title.innerHTML = `<h3> ${data.station} Station Arriving and Departing Passengers</h3>
                       <h4> (Total arrivals per hour)</h4>`
}


// class="Content-Dataview-Data-Box
