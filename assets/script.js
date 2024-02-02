const apiKey = 'cmsltq9r01qpvcpt777gcmsltq9r01qpvcpt7780';
const companysybol = 'AAPL'; //WE WANT THIS TO BE INPUT BY USER
const companyName="Apple Inc" //polygone to get this?


fetch("https://finnhub.io/api/v1/quote?symbol=" + companysybol + "&token=" + apiKey)
  .then(response => response.json())
  .then(companyData => {
    console.log(companyData);
  })
  .catch(error => {
    console.error('Error fetching company data:', error);
  });

const poly_api_key= "BGrqA9jp0bOXCmaiGwDF8i6EACuuN7SD"

const fetchRequest= "//api.polygon.io/v3/reference/tickers?search=" + companyName+ "&apiKey=" + poly_api_key;
console.log(fetchRequest);



/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for the API based on form inputs
 */
function buildQueryURL(input) {

  var companysybol = "AAPL";

  // queryURL is the url we'll use to query the API
  var queryURL = "";
  
  return queryURL;
}


/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} stockData - object containing the API data
 */
function updatePage(stockData) {

}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#btn-primary").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  input = $("#search-input")
    .val()
    .trim();

  // Build the query URL for the Fetch request to the API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
});

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#btn-secondary").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // input will be fetched from storage data
  input = "Need to fetch from storage data"

  // Build the query URL for the Fetch request to the the API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
});

function pageOnLoad(input){
  // Build the query URL for the Fetch request to the API
  var queryURL = buildQueryURL(input);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updatePage);
}


$( function() {
  $( "#datepicker" ).datepicker();
} );
