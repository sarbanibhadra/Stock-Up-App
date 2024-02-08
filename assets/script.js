var historyCard = $("#stock-data-card-H")


/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for the API based on form inputs
 */
function buildQueryURLCurrent(companysybol) {
  var apiKey= "cmv4ch1r01qog1iu9gogcmv4ch1r01qog1iu9gp0"
  // queryURL is the url we'll use to query the API
  var queryURL = "https://finnhub.io/api/v1/quote?symbol=" + companysybol + "&token=" + apiKey;
  return queryURL;
}

/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for the API based on form inputs
 */
function buildQueryURLHistory(companysybol, chosenDate) {
  var apiKey= "AZ9XtTlMv4BXEyii4QAqKxFDO4PujECE"
  console.log(companysybol +"  "+chosenDate);
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.polygon.io/v1/open-close/" + companysybol + "/" + chosenDate + "?adjusted=true&apiKey=" + apiKey;
  console.log(queryURL)
  var queryURL1 = "https://api.polygon.io/v1/open-close/AAPL/2023-01-09?adjusted=true&apiKey=AZ9XtTlMv4BXEyii4QAqKxFDO4PujECE"
  console.log(queryURL1)
  return queryURL;
}


//Second API call for historic stock data - needs to linked to an onchange event for datepicker
// Shall we re-write the buildQueryURL function above to generate both API calls? Otherwise, second API call is as below:
//var queryURL2 = "https://api.polygon.io/v1/open-close/" + companysybol + "/" + chosenDate + "?adjusted=true&apiKey=" + apiKey2;


/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} stockData - object containing the API data
 */
function updateStockDataCurrent(stockData) {
  console.log(stockData);
  selectElement = document.querySelector('#stocks');
                  
  output = selectElement.value;
  if (output == 'AAPL')
    outputTxt = "Apple Inc."
  else if (output == 'MSFT')
    outputTxt = "Microsoft Corp."
  else if (output == 'AMZN')
    outputTxt = "Amazon.com Inc."
  else if (output == 'NVDA')
    outputTxt = "NVIDIA Corp."
  else if (output == 'AVGO')
    outputTxt = "Broadcom Inc."
  else if (output == 'META')
    outputTxt = "Meta Platforms Inc."
  else if (output == 'TSLA')
    outputTxt = "Tesla Inc."
  else if (output == 'GOOGL')
    outputTxt = "Alphabet Inc. Class A."
  else if (output == 'COST')
    outputTxt = "Costco Wholesale Corp."
  else if (output == 'NFLX')
    outputTxt = "Netflix Inc."
  
  $('.card-text0').empty()
  $('.card-text0').append("Company: "+outputTxt)
  $('.card-text1').empty()
  $('.card-text1').append("Current Price: "+stockData.c)
  $('.card-text2').empty()
  $('.card-text2').append("Change: "+stockData.d)
  $('.card-text3').empty()
  $('.card-text3').append("Percent Change: "+stockData.dp)
  $('.card-text4').empty()
  $('.card-text4').append("High price of the day: "+stockData.h)
  $('.card-text5').empty()
  $('.card-text5').append("Low price of the day: "+stockData.l)
  $('.card-text6').empty()
  $('.card-text6').append("Open price of the day: "+stockData.o)
  $('.card-text7').empty()
  $('.card-text7').append("Previous close price: "+stockData.pc)

  historyCard.empty()
  var carHeader = $("<h5>")
  carHeader.addClass("card-title")
  carHeader.attr("id", "stock-data-header")
  carHeader.append("Daily Open Close")     
  historyCard.append(carHeader)
}


// .on("change") function associated with the Drop Down list
$("#stocks").on("change", function (event) {
  // DEVELOP: local storage for every stock picked and add to an array to make a fancy "stocks you looked at" card/div
  event.preventDefault();
  input = $(event.target).val();
  console.log(input);
  // Build the query URL for the Fetch request to the API
  var queryURL = buildQueryURLCurrent(input);
  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updateStockDataCurrent);
});

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} stockData - object containing the API data
 */
function updateStockDataHistory(pastStockData) {
  console.log(pastStockData);
  selectElement = document.querySelector('#stocks');                
  output = selectElement.value;

  if (output == 'AAPL')
    outputTxt = "Apple Inc."
  else if (output == 'MSFT')
    outputTxt = "Microsoft Corp."
  else if (output == 'AMZN')
    outputTxt = "Amazon.com Inc."
  else if (output == 'NVDA')
    outputTxt = "NVIDIA Corp."
  else if (output == 'AVGO')
    outputTxt = "Broadcom Inc."
  else if (output == 'META')
    outputTxt = "Meta Platforms Inc."
  else if (output == 'TSLA')
    outputTxt = "Tesla Inc."
  else if (output == 'GOOGL')
    outputTxt = "Alphabet Inc. Class A."
  else if (output == 'COST')
    outputTxt = "Costco Wholesale Corp."
  else if (output == 'NFLX')
    outputTxt = "Netflix Inc."
  
  
  //<h5 class="card-title"  id="stock-data-header" >Daily Open Close</h5>
  var carHeader = $("<h5>")
  carHeader.addClass("card-title")
  carHeader.attr("id", "stock-data-header")
  carHeader.append("Daily Open Close")     

  var afterHours = $("<p>")
  afterHours.append("AfterHours: "+pastStockData.afterHours);
  afterHours.attr("id", "stock-data")

  var close = $("<p>")
  close.append("Close: "+pastStockData.close);
  close.attr("id", "stock-data")

  var high = $("<p>")
  high.append("High: "+pastStockData.high);
  high.attr("id", "stock-data")

  var low = $("<p>")
  low.append("Low: "+pastStockData.low);
  low.attr("id", "stock-data")

  var open = $("<p>")
  open.append("Open: "+pastStockData.open);
  open.attr("id", "stock-data")

  var preMarket = $("<p>")
  preMarket.append("PreMarket: "+pastStockData.preMarket);
  preMarket.attr("id", "stock-data")

  var volume = $("<p>")
  volume.append("Volume: "+pastStockData.volume);
  volume.attr("id", "stock-data")

  historyCard.empty()
  historyCard.append(carHeader, afterHours, close, high, low, open, preMarket, status, volume)
  console.log(historyCard)
  

  // "afterHours": 322.1,
  // "close": 325.12,
  // "from": "2023-01-09",
  // "high": 326.2,
  // "low": 322.3,
  // "open": 324.66,
  // "preMarket": 324.5,
  // "status": "OK",
  // "symbol": "AAPL",
  // "volume": 26122646
  // $('.card-text0').empty()
  // $('.card-text0').append("Company: "+outputTxt)
  // $('.card-text1').empty()
  // $('.card-text1').append("Current Price: "+stockData.c)
  // $('.card-text2').empty()
  // $('.card-text2').append("Change: "+stockData.d)
  // $('.card-text3').empty()
  // $('.card-text3').append("Percent Change: "+stockData.dp)
  // $('.card-text4').empty()
  // $('.card-text4').append("High price of the day: "+stockData.h)
  // $('.card-text5').empty()
  // $('.card-text5').append("Low price of the day: "+stockData.l)
  // $('.card-text6').empty()
  // $('.card-text6').append("Open price of the day: "+stockData.o)
  // $('.card-text7').empty()
  // $('.card-text7').append("Previous close price: "+stockData.pc)
}


// .on("click") function associated with the Search Button
$("#datepicker" ).on("change", function(event){
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  console.log($(event.target).val());
  var chosenDate = $(event.target).val();
  selectElement = document.querySelector('#stocks');  
  companysymbol = selectElement.value;

  // Build the query URL for the Fetch request to the the API
  var queryURL = buildQueryURLHistory(companysymbol, chosenDate);

  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(updateStockDataHistory
      //THIS WOULD BE WHERE IF STATEMENT SITS TO CATCH ERROR CAUSED BY BEING OUTSIDE DATE PARAMETERS
      );
    
});

function pageOnLoad(companysybol){
  // Build the query URL for the Fetch request to the API
  var queryURL = buildQueryURLCurrent(companysybol);
  console.log(queryURL);
  // Make the Fetch request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  fetch(queryURL)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(updateStockDataCurrent);
}


$( function() {
  $( "#datepicker").datepicker({
    dateFormat: "yy-mm-dd", // NOTE this actually returns yyyy-mm-dd format
    maxDate: -1,
    minDate: -730,
  }
  ); 
} );

