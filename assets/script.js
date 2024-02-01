const apiKey = 'cmsltq9r01qpvcpt777gcmsltq9r01qpvcpt7780';
const companysybol = 'AAPL'; //WE WANT THIS TO BE INPUT BY USER
const companyName="TESLA" //polygone to get this?


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
fetch(fetchRequest)
.then(response => response.json())
  .then(companyData => {
    console.log(companyData);
  })
  .catch(error => {
    console.error('Error fetching company data:', error);
  });

  $( function() {
    $( "#datepicker" ).datepicker();
} );
