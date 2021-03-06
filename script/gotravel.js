$(function(){

    var selectedCity = $('#citySelect').val();
    var selectedMonth = $('#monthSelect').val();
    var selectedAdvice = $('#adviceSelect').val();

    var stateCountry = {name: 'Texas', value: 'TX'};
    var city = {name: 'Austin', value: 'Austin'};
    var monthUrls;

    ///////// Photo Ajax //////////
    $.ajax({
        url: 'https://api.unsplash.com/photos/search?category=4&query=travel&client_id=b21a9e8e8640c016bfff18622954eaa29cb31d67178c80f5e36efeaa02e9cb70',
        type: "GET",
        dataType: 'json',
    }).done(function(data){
        var bgPhotos = [];
        for (var i = 0; i < data.length; i++) {
            bgPhotos.push(data[i].urls.raw);
        }
        var randomBG = bgPhotos[Math.floor(Math.random() * bgPhotos.length)]
        $('body').css({'background-image': 'url(' + randomBG + ')'});
    });

    //////////Weather Ajax call function/////////
    function getMonthWeather(month) {
            $.ajax({
            url: month,
            type: "GET",
            dataType: 'json',
        }).done(function(data){
            var highF = data.trip.temp_high.avg ['F'] + ' F';
            var lowF = data.trip.temp_low.avg ['F'] + ' F';
            var highC = data.trip.temp_high.avg ['C'] + ' C';
            var lowC = data.trip.temp_low.avg ['C'] + ' C';
            var chanceRain = data.trip.chance_of.chanceofrainday.percentage + '%';
            $('#highF').text(highF);
            $('#lowF').text(lowF);
            $('#highC').text(highC);
            $('#lowC').text(lowC);
            $('#rainChance').text(chanceRain);
        });
    }

    //show advice/initial form; create ajax urls
    $('button#getAdvice').click(function(){

        //get the value of the selected items
        selectedCity = $('#citySelect').val();
        selectedMonth = $('#monthSelect').val();
        selectedAdvice = $('#adviceSelect').val();

        //split the item values to use in the ajax calls
        city.value = $( "#citySelect option:selected" ).text().split(", ")[0];
        stateCountry.value = $( "#citySelect option:selected" ).text().split(", ")[1];

        //ajax calls to Wunderground to grab historical data based on city and state/country
        monthUrls = {
            January: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_01010131/q/' + stateCountry.value + '/' + city.value + '.json',
            February: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_02010228/q/' + stateCountry.value + '/' + city.value + '.json',
            March: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_03010331/q/'
            + stateCountry.value + '/' + city.value + '.json',
            April: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_04010430/q/'
            + stateCountry.value + '/' + city.value + '.json',
            May: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_05010531/q/'
            + stateCountry.value + '/' + city.value + '.json',
            June: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_06010630/q/'
            + stateCountry.value + '/' + city.value + '.json',
            July: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_07010731/q/'
            + stateCountry.value + '/' + city.value + '.json',
            August: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_08010831/q/'
            + stateCountry.value + '/' + city.value + '.json',
            September: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_09010930/q/'
            + stateCountry.value + '/' + city.value + '.json',
            October: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_10011031/q/'
            + stateCountry.value + '/' + city.value + '.json',
            November: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_11011130/q/'
            + stateCountry.value + '/' + city.value + '.json',
            December: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_12011231/q/'
            + stateCountry.value + '/' + city.value + '.json'
        }

        //call Ajax to get weather data
        getMonthWeather(monthUrls[selectedMonth]);

        //fill in html with selections
        $('#city').html(selectedCity);
        $('#monthTxt').html(selectedMonth);

        //show the get advice form
        $('#initialForm').hide();
        $('#giveAdviceForm').hide();
        $('#getAdviceForm').show();
        $('#weatherBox').show();
        $('#loginForm').hide();
        $('#signupForm').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });


    //show give advice form
    $('button#giveAdvice').click(function(){
        selectedCity = $('#citySelect').val();
        selectedMonth = $('#monthSelect').val();
        selectedAdvice = $('#adviceSelect').val();

        //fill in html with selections
        $('#cityGive').html(selectedCity + '<br>');
        $('#monthGive').html(selectedMonth  + '<br>');
        $('#adviceGive').html(selectedAdvice);

        $('#initialForm').hide();
        $('#giveAdviceForm').show();
        $('#getAdviceForm').hide();
        $('#weatherBox').hide();
        $('#loginForm').hide();
        $('#signupForm').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });

    //show login form
    $('button#loginBtn').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').show();
        $('#weatherBox').hide();
        $('#signupForm').hide();
        $('#giveAdviceForm').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });

    //show advice submit success screen
    $('button#submitAdvice').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').hide();
        $('#weatherBox').hide();
        $('#signupForm').hide();
        $('#giveAdviceForm').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').show();
    });

    //show login success screen
    $('button#loginSubmit').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').hide();
        $('#weatherBox').hide();
        $('#signupForm').hide();
        $('#giveAdviceForm').hide();
        $('#loginSuccess').show();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });

    //show sign up form
    $('button#signupBtn').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').hide();
        $('#signupForm').show();
        $('#giveAdviceForm').hide();
        $('#weatherBox').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });


    //return home
    $('button#changeBtn').click(function(){
        $(location).attr('href','index.html');
    });

    //return home another way
    $('button.goHome').click(function(){
        $('#initialForm').show();
        $('#getAdviceForm').hide();
        $('#loginForm').hide();
        $('#signupForm').hide();
        $('#giveAdviceForm').hide();
        $('#weatherBox').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();
        $('#submitSuccess').hide();
    });

    //prevent default stuff on form submits
    $("form").submit(function(event) {
        event.preventDefault();
    });

    //show give more advice screen; scrolls to top
    $('button.giveMoreAdvice').click(function(){
        var selectedCity = $('#citySelectGive').val();
        var selectedMonth = $('#monthSelectGive').val();
        var selectedAdvice = $('#adviceSelectGive').val();

        $('#cityGive').html(selectedCity + '<br>');
        $('#monthGive').html(selectedMonth  + '<br>');
        $('#adviceGive').html(selectedAdvice);

        $('#initialForm').hide();
        $('#giveAdviceForm').show();
        $('#getAdviceForm').hide();
        $('#weatherBox').hide();
        $('#loginForm').hide();
        $('#signupForm').hide();
        $('#loginSuccess').hide();
        $('#signupSuccess').hide();

        $('html, body').animate({ scrollTop: 0 }, 0);
    });

    //change advice
    $('button#moreAdvice').on('click', function(){
        var selectedCity = $('#citySelect').val();
        var selectedMonth = $('#monthSelect').val();
        var selectedAdvice = $('#adviceSelect').val();

        $('#city').text(selectedCity);
        $('#monthTxt').text(selectedMonth);


        if($('select:visible option:selected').text() === 'Things to avoid'){
            $('p#adviceText').text("Avoid driving on I-35 anytime of the day or night. The traffic is always terrible and will give you a sad.");
            $('p#author').text("Patrick K. - resident since 1994");
        }
        else if($('select:visible option:selected').text() === 'Things to eat'){
            $('p#adviceText').text("Torchy's Tacos is mecca for awesome tacos in Austin. Check out their taco of the month. Om nom nom nom!");
            $('p#author').text("H. Kelly - resident since 2005");
        }
        else if($('select:visible option:selected').text() === 'Things to do'){
            $('p#adviceText').text("Make it a point to visit Hamilton Pool at some point. It's a perfect way to cool off during the summer.");
            $('p#author').text("Moxxi - resident since 2015");
        }
    });

    var signUpEmail = $("input:text[name='signupEmail']").val();

    //sign up form validation hell
    $('button#signupSubmit').click(function(event) {
        signupCheck();

        if (validateEmail(signUpEmail)) {
            $('#initialForm').hide();
            $('#getAdviceForm').hide();
            $('#loginForm').hide();
            $('#signupForm').hide();
            $('#giveAdviceForm').hide();
            $('#weatherBox').hide();
            $('#loginSuccess').hide();
            $('#signupSuccess').show();
        }
        // else {
        //     $('#emailCheck').html('Email is not valid. Please re-enter.');
        //     event.preventDefault();
        // }

     });

     //validate email function
     function validateEmail(sEmail) {
        var filter = /(\w+)\@(\w+)\.[a-zA-Z]/g;
            if (filter.test(signUpEmail)) {
                return true;
            }
            else {
                return false;
            }
        }

    //validate sign up form fields
    function signupCheck(){

        if($("input:text[name='signupName']").val().length < 1){
            $('#usernameAlert').html("You must enter a user name");
        }
        else if($("input:text[name='signupName']").val().length > 0){
            $('#usernameAlert').hide();
        }

        if($("input:password[name='signupPW']").val().length < 5){
            $('#pwAlert').html("Your password must be at least 5 characters");
        }
        else if($("input:password[name='signupPW']").val().length < 1){
            $('#pwAlert').html("You must enter a password");
        }
        else if($("input:password[name='signupPW']").val().length > 5){
            $('#pwAlert').hide();
        }

        if($("input:password[name='pwAgain']").val() !== $("input:password[name='signupPW']").val()){
            $('#pwMatch').html("Your passwords don't match &#9785; Please try again");
        }
        else if($("input:password[name='pwAgain']").val() === $("input:password[name='signupPW']").val()){
            $('#pwMatch').hide();
        }

        if ($("input:text[name='signupEmail']").val().length < 1) {
            $('#emailCheck').html('Email is required.');
            event.preventDefault();
        }
        else if ($("input:text[name='signupEmail']").val().length > 0){
            $('#emailCheck').hide();
        }

        if($("input:text[name='signupCity']").val().length < 1){
            $('#cityAlert').html("You must enter a city");
        }
        else if($("input:text[name='signupCity']").val().length > 0){
            $('#cityAlert').hide();
        }
    }
});//end main function
