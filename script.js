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
          let domainName = response.data.items[0].properties.domain;
          //Droping the last character
          let companyDomain = (domainName.split('/').join(''));
          //CALL FUNCTION - renderCardOne 
          renderCardOne(response);
          renderCardTwo(symbol);
          renderCardThree(symbol);
          renderCardFour(companyDomain);
        })
    })
    // TRANSFER TO HTML
    function renderCardOne(response) {
      $('.name').html("<h2>Company Name: " + response.data.items[0].properties.name + "</h2>");
      $('.domainName').text("Domain Name: " + response.data.items[0].properties.domain);
      $(".locations").text("Headquarter Location: " + response.data.items[0].properties.region_name + ', ' + response.data
        .items[0].properties.city_name);
      $('.stockexchange').text("Stock Exchange: " + response.data.items[0].properties.stock_exchange);
      $('.stocksymbol').text("Stock Symbol: " + response.data.items[0].properties.stock_symbol);
      $('.description').text("Description: " + response.data.items[0].properties.short_description);
      $('.linkedin').text("LinkedIn URL: " + response.data.items[0].properties.linkedin_url);
      $('.stocks').text("Stock Symbol: " + response.data.items[0].properties.stock_symbol);
      $('.intro').text("Hi " + response.data.items[0].properties.name + ",");
      $('.secondsentence').text("How's it going in " + response.data.items[0].properties.region_name + "?");
      $('.thirdsentence').text("I see that " + response.data.items[0].properties.short_description);
      $('.fourthsentence').text("Here at [INSERT YOUR COMPANY NAME] have helped people/companies like you[rs] improve their [INSER VALUE PROP], would you be open to having a 10-minute conversion around our solution?");
      $('.fifthsentence').text("Sincerely, [INSERT YOUR NAME HERE]");
      $('.titlesentence').html("<h2>Sales Script - Generic: </h2>");
      let companyImg = response.data.items[0].properties.profile_image_url;
      $('#cicon').attr('src', companyImg);
    }
    function renderCardTwo(symbol) {
      // Finnhub API Key
      var APIKey = 'bot4m1vrh5reabqs9rk0';
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
          // TESTING PURPOSE
          console.log(response);
          //Check for no data
          if (response.symbol != 'null') {
            $('.symbol').html('<h2>Major Developments: ' + response.symbol + '</h2>');
            $('.datetime').text('Date: ' + response.majorDevelopment[0].datetime);
            $(".headline").text('Headline: ' + response.majorDevelopment[0].headline);
            // $('.description').text('Description: ' + response.majorDevelopment[0].description);
          } else {
            $('.symbol').html('<h2>Major Developments: ' + 'No Data Available' + '</h2>');
            $('.datetime').text('Date: No Data Available');
            $(".headline").text('Headline: No Data Available');
          }
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
          //TESTING PURPOSE
          console.log(data);
          //Check for no data
          if (data.symbol != '') {
            $('.metric').html('<h2>Growth Metrics: ' + data.symbol + '</h2>');
            $('.growth5Y').text('Book Value Growth Rate (Per Share 5Y) : ' + Math.round(data.metric.bookValueShareGrowth5Y).toFixed(1) + '%');
            $('.capitalSpend5Y').text('Capital Spending growth Rate 5Y : ' + Math.round(data.metric.capitalSpendingGrowth5Y).toFixed(1) + '%');
            $('.dividend5Y').text('Dividend Growth Rate 5Y : ' + Math.round(data.metric.dividendGrowthRate5Y).toFixed(1) + '%');
            $('.netMargin5Y').text('Net Margin Growth 5Y : ' + Math.round(data.metric.netMarginGrowth5Y).toFixed(1) + '%');
            $('.revenueGrowth5Y').text('Revenue Growth Rate 5Y : ' + Math.round(data.metric.revenueGrowth5Y).toFixed(1) + '%');
          } else {
            $('.metric').html('<h2>Growth Metrics: Not Available' + '</h2>');
            $('.growth5Y').text('Book Value Growth Rate (Per Share 5Y) : Not Available');
            $('.capitalSpend5Y').text('Capital Spending growth Rate 5Y : Not Available');
            $('.dividend5Y').text('Dividend Growth Rate 5Y : Not Available');
            $('.netMargin5Y').text('Net Margin Growth 5Y : Not Available');
            $('.revenueGrowth5Y').text('Revenue Growth Rate 5Y : Not Available');
          }
        })
    }
    function renderCardFour(companyDomain) {
      // Finnhub API Key
      var APIKey = 'a93bc93acd1ba3cc69a1814f7ee909396256fca3';
      //Check to see variable passed
      console.log('Passed: ' + companyDomain + ' to renderCardFour');
      // URL we need to query the crunchbase
      var queryURL = 'https://api.hunter.io/v2/domain-search?domain=' + companyDomain + '&api_key=' + APIKey;
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // Store all of the retrieved data inside of an object called "response"
        .then(function (response) {
          // TESTING PURPOSE
          console.log(response);
          // Transfer content to HTML
           $('.contacts').html("<h1>Contact Info: " + response.data.organization + "</h1>");
          //  $('.domain').text("Domain: " + responseFour.data.domain);
          //  $('.country').text("Country: " + responseFour.data.country);
          //  $('.state').text("State: " + responseFour.data.state);
          //  $('<br/>');
         $('.emails').html(' ');
          for (var i = 0; i < response.data.emails.length; i++) {
            var p3 = $('<p>').text('Contact Name: ' + response.data.emails[i].first_name + ' ' + response.data.emails[i].last_name);
            var p4 = $('<p>').text('Contact Title: ' + response.data.emails[i].position);
            var p5 = $('<p>').text('Contact Email: ' + response.data.emails[i].value);
            $('.emails').append(p3);
            $('.emails').append(p4);
            $('.emails').append(p5);
          }
          //Log the data in the console
          //  console.log("Domain: " + response.data);
          console.log("Email Count: " + response.data.emails.length);
        })
    }
  });