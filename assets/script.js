var historyCard = $("#stock-data-card-H")
var historicData = localStorage.getItem("historyData") ? JSON.parse(localStorage.getItem("historyData")): null



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
  historicData && renderHistoricData() //short circuit
  selectElement = document.querySelector('#stocks');                  
  currentCompany = selectElement.value;

  if (currentCompany == 'AAPL')
    currentCompanyTxt = "Apple Inc."
  else if (currentCompany == 'MSFT')
    currentCompanyTxt = "Microsoft Corp."
  else if (currentCompany == 'AMZN')
    currentCompanyTxt = "Amazon.com Inc."
  else if (currentCompany == 'NVDA')
    currentCompanyTxt = "NVIDIA Corp."
  else if (currentCompany == 'AVGO')
    currentCompanyTxt = "Broadcom Inc."
  else if (currentCompany == 'META')
    currentCompanyTxt = "Meta Platforms Inc."
  else if (currentCompany == 'TSLA')
    currentCompanyTxt = "Tesla Inc."
  else if (currentCompany == 'GOOGL')
    currentCompanyTxt = "Alphabet Inc. Class A."
  else if (currentCompany == 'COST')
    currentCompanyTxt = "Costco Wholesale Corp."
  else if (currentCompany == 'NFLX')
    currentCompanyTxt = "Netflix Inc."
  
  $('.card-text0').empty()
  $('.card-text0').append("Company: "+currentCompanyTxt)
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
  $('#datepicker').datepicker('setDate', null);

  historicData = {currentCompanyTxt, currentCompany, ...stockData} //spread operator
  console.log("historicData: ", historicData);
  localStorage.setItem("historyData", JSON.stringify(historicData))
}


function renderHistoricData(){
  console.log("inside renderHistoricData", historicData.currentCompanyTxt)
  var src = "";

var currentCompany = historicData.currentCompany;
if (currentCompany == 'AAPL')
  src="./assets/images/logoAppleW.png"
else if (currentCompany == 'MSFT')
  src="./assets/images/microsoftLogoW.png"
else if (currentCompany == 'AMZN')
  src="./assets/images/amazonW.png"
else if (currentCompany == 'NVDA')
  src="./assets/images/nvidiaW.png" 
else if (currentCompany == 'AVGO')
  src="./assets/images/broadW.png"
else if (currentCompany == 'META')
  src="./assets/images/metaW.png"
else if (currentCompany == 'TSLA')
  src="./assets/images/teslaW.png"
else if (currentCompany == 'GOOGL')
  src = ""
else if (currentCompany == 'COST')
  src="./assets/images/costcoW.png"
else if (currentCompany == 'NFLX')
  src="./assets/images/netflixW.png"
 

  var lastCard = $("#stock-data-card-L")
  //<img src="./assets/images/microsoftLogo.png" alt="Microsoft" class="image-button">
  var carHeader = $("<h5>")
  carHeader.addClass("card-title")
  carHeader.attr("id", "stock-data-header")
  carHeader.append("Last Stock checked")

  var lastStockName = $("<p>")
  lastStockName.append(historicData.currentCompanyTxt+"   ("+currentCompany+")");
  lastStockName.attr("id", "stock-data")

  var lastStockImg = $("<img>")
  lastStockImg.addClass("image-button")
  lastStockImg.attr("src", src)
  lastCard.empty()
  lastCard.append(carHeader, lastStockName, lastStockImg)
}


// .on("change") function associated with the Drop Down list
$("#stocks").on("change", function (event) {
  // DEVELOP: local storage for every stock picked and add to an array to make a fancy "stocks you looked at" card/div
  event.preventDefault();
  input = $(event.target).val();
  console.log(input);
  

  // var lastChosenStockSymbol = localStorage.getItem("chosenStock");
  // console.log( 'previous stock', typeof lastChosenStockSymbol)
  // if (lastChosenStockSymbol){
  // localStorage.setItem('previousStock', lastChosenStockSymbol)
  //   $(".last-stock-display").text(lastChosenStockSymbol);
  
  // }
  
  // localStorage.setItem("chosenStock", input);

  // //DOES THE ABOVE getItem need to sit in its own function (example below) or another of the event listeners? 
  // // function recallStockSymbol () {
  // //   var lastChosenStockSymbol = localStorage.getItem("chosenStock");
  // //   console.log(lastChosenStockSymbol + "is your last chosen stock");
  // // };

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

function updateStockChecker(pastStockData) {
  console.log(pastStockData)
  var carHeader = $("<h5>")
    carHeader.addClass("card-title")
    carHeader.attr("id", "stock-data-header")
    carHeader.append("Daily Open Close")
    var msgE = $("<p>")
    msgE.attr("id", "stock-data-error")

  if (pastStockData.status == "OK"){
    updateStockDataHistory(pastStockData)
  } else if (pastStockData.status == "ERROR"){
    console.log(pastStockData.status)
    message = "Error: You've exceeded the maximum requests per minute, please wait!";
    historyCard.empty()
    msgE.append(message)
    historyCard.append(carHeader, msgE)
  } else if (pastStockData.status == "NOT_FOUND"){
    message = "Error: Market Close, Try a week day!";
    historyCard.empty()
    msgE.append(message)
    historyCard.append(carHeader, msgE)
  }

}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} stockData - object containing the API data
 */
function updateStockDataHistory(pastStockData) {
  console.log(pastStockData);
  selectElement = document.querySelector('#stocks');                
  output = selectElement.value;

  
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
  historyCard.append(carHeader, afterHours, close, high, low, open, preMarket, volume)
  console.log(historyCard)
  
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
    .then(updateStockChecker
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