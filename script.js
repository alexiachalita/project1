$(document).ready(function () {

$('#srchBtn').on('click', function () {
  // Crunchbase API Key
  var APIKey = 'a4c82e5afba2b0d13219a4ffb25081a3';
  var name = '';
  var name = $('#companySearch').val();
  var symbol = $('#symbol').val();
 
  // URL we need to query the crunchbase
  var queryURL = "https://api.crunchbase.com/v3.1/odm-organizations?" +
    "name=" + name + "&user_key=" + APIKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // Store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the resulting object
      console.log(response);
      // DECLARE VARIABLES TO PASS TO FINNHUB
      let symbol = response.data.items[0].properties.stock_symbol;
      //TESTING PURPOSE
      console.log(symbol);

      //CALL FUNCTION - renderCardOne 
      renderCardOne(response);
      renderCardTwo(symbol);
      renderCardThree(symbol);
    })
})

// TRANSFER TO HTML
function renderCardOne(response) {
  $('.name').html("<h2>Company Name: " + response.data.items[0].properties.name + "</h2>");
  $('.domainName').text("Domain Name: " + response.data.items[0].properties.domain);
  $(".locations").text("Headquarter Location: " + response.data.items[0].properties.region_name + ', ' + response.data
    .items[0].properties.city_name);
  $('.stockexchange').text("Stock Exchange: " + response.data.items[0].properties.stock_exchange);
  $('.stocksymbol').text("Stock Symbol:" + response.data.items[0].properties.stock_symbol);
  $('.description').text("Description: " + response.data.items[0].properties.short_description);
  $('.linkedin').text("LinkedIn URL: " + response.data.items[0].properties.linkedin_url);
  $('.stocks').text("Stock Symbol:" + response.data.items[0].properties.stock_symbol);
  $('.intro').text("Hi " + response.data.items[0].properties.name + ",");
  $('.secondsentence').text("How's it going in " + response.data.items[0].properties.region_name + "?");
  $('.thirdsentence').text("I see that " + response.data.items[0].properties.short_description);
  $('.fourthsentence').text("Here at [INSERT YOUR COMPANY NAME] have helped people/companies like you[rs] improve their [INSER VALUE PROP], would you be open to having a 10-minute conversion around our solution?");
  $('.fifthsentence').text("Sincerely, [INSERT YOUR NAME HERE]");
  $('.titlesentence').html("<h2>Sales Script - Generic: </h2>");
 let companyImg =  response.data.items[0].properties.profile_image_url;
 console.log(companyImg);
  $('#cicon').attr('src',companyImg);


  //ONLY FOR TESTING PURPOSE ---- CONSOLE.LOG
  // console.log("Company Name: " + response.data.items[0].properties.name);
  // console.log("Domain Name: " + response.data.items[0].properties.domain);
  // console.log("Region: " + response.data.items[0].properties.region_name);
  // console.log("City: " + response.data.items[0].properties.city_name);
  // console.log("Stock Exchange: " + response.data.items[0].properties.stock_exchange);
  // console.log("Stock Symbol: " + response.data.items[0].properties.stock_symbol);
  // console.log("Description: " + response.data.items[0].properties.short_description);
  // console.log("LinkedIn URL: " + response.data.items[0].properties.linkedin_url);
  }   
        
  function renderCardTwo(symbol) {
    // Finnhub API Key
    var APIKey = 'bot4m1vrh5reabqs9rk0';
    // var symbol = '';
    // var symbol = $('#symbolSearch').val();
    console.log('Passed: ' + symbol + ' to renderCardTwo');

    // URL we need to query the crunchbase
    var queryURL = "https://finnhub.io/api/v1/major-development?symbol=" +
      symbol + "&token=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      // Store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);

        $('.symbol').html("<h2>Major Developments: " + response.symbol + "</h2>");
        $('.datetime').text("Date: " + response.majorDevelopment[0].datetime);
        $(".headline").text("Headline: " + response.majorDevelopment[0].headline);
        $('.description').text("Description: " + response.majorDevelopment[0].description);

      })
    }

    function renderCardThree(symbol) {
      var APIKey = 'bot4m1vrh5reabqs9rk0';
      console.log('Passed: ' + symbol + ' to renderCardThree');
      let queryURLMetric = 'https://finnhub.io/api/v1/stock/metric?symbol=' +
        symbol + '&metric=growth&token=' + APIKey;
                      
      $.ajax({
          url: queryURLMetric,
          method: 'GET',
          dataType: 'json'
        })
        //Store data retreived inside object called response
        .then(function (data) {
          //show queryURL Metric
          console.log(queryURLMetric);
          console.log(data);
          console.log("Symbol: " + data.symbol);
      
          $('.metric').html("<h2>Metrics Growth: " +  data.symbol + "</h2>");
          $('.growth5Y').text('Book Value Growth Rate (Per Share 5Y) : ' + (data.metric.bookValueShareGrowth5Y).toFixed(1) + '%');
          $('.capitalSpend5Y').text('Capital Spending growth Rate 5Y : ' + (data.metric.capitalSpendingGrowth5Y).toFixed(1) + '%');
          $('.dividend5Y').text('Dividend Growth Rate 5Y : ' + Math.round(data.metric.dividendGrowthRate5Y).toFixed(1) + '%');
          $('.netMargin5Y').text('Net Margin Growth 5Y : ' + Math.round(data.metric.netMarginGrowth5Y).toFixed(1) + '%');
          $('.revenueGrowth5Y').text('Revenue Growth Rate 5Y : ' + Math.round(data.metric.revenueGrowth5Y).toFixed(1) + '%');
        })
      }
    });

      



