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

let ridership_data = {};

// todo clean this up
// fetch("./data/ridership_data.json")
// .then(response => response.json())
// .then(data => {
// console.log("Got the data!");
// ridership_data=data;
// // TODO: Call a function to do something with this data.
// printData()
// })
//
// function printData() {
//   console.log(ridership_data);
// }

init();

function init() {
  addMonths();
  addStation();
  addListeners();
}

function addMonths() {
  console.log('addMonths')
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
  console.log('addStation')
  let dropdown = document.querySelector(".Content-Dataview-Controls-Station");
  console.log(stations)
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
    console.log(child)
      child.addEventListener("change", hello);
  }
}

function hello() {
  console.log('hello')
}

function render() {
  //pass
}


// class="Content-Dataview-Data-Box
