
"use strict";

$(function () {
  // Get references to DOM elements
  const city = document.querySelector("#city");
  const cityChosenElements = document.querySelectorAll("#cityChosen");
  const currentDegElement = document.querySelector(".currentDeg");
  const statWeather = document.querySelector(".statWeather");
  const weatherImg = document.querySelector(".weatherImg");
  const WeekDay = document.querySelector("#WeekDay");
  const exactDay = document.querySelector("#exactDay");



  // $(".cube").hide()

  // Function to fetch data from the API
  async function fetchData(cityName) {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=10e33120282c42e0adf83655231908&q=${cityName}&days=7`);
    const data = await response.json();
    
    // $(".cube").slideDown(1000)
    return data;
  }

  // Function to update the DOM with fetched data
  async function updateDOM() {
    const cityNNName = city.value;
    const data = await fetchData(cityNNName);

   


    // Update the DOM with fetched data
    cityChosenElements.forEach((element) => {
      element.textContent = data.location.name;
    });

    // Input date in the format "YYYY-MM-DD"
    let inputDate = data.location.localtime;

    // Convert the input string to a Date object
    let dateObject = new Date(inputDate);
    let dateObject2 = new Date(data.forecast.forecastday[1].date).getDay()
    let dateObject3 = new Date(data.forecast.forecastday[2].date).getDay()
    // Get the day of the week as an integer (0 = Sunday, 6 = Saturday)
    let dayOfWeek = dateObject.getDay();

    //   Start exact of month
    let day = dateObject.getDate();
    let month = dateObject.toLocaleString('default', { month: 'long' });
    let formattedDate = day + month;
    //   End


    // Start day of week
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[dayOfWeek];
    let nextDayName = days[dateObject2];
    let dayAftertom = days[dateObject3];

    exactDay.textContent = formattedDate
    WeekDay.textContent = dayName;
    // End


    // 1st Day
    currentDegElement.textContent = data.current.temp_c + "c";
    statWeather.textContent = data.current.condition.text;
    weatherImg.setAttribute('src', data.current.condition.icon)
    // End

    // 2nd Day

    $("#day2").text(nextDayName)
    $("#day2degree").text(data.forecast.forecastday[1].day.maxtemp_c + "c")
    $(".lowDeg2").text(data.forecast.forecastday[1].day.mintemp_c + "c")
    $("#status2").text(data.forecast.forecastday[1].day.condition.text)
    $("#weather-Img2").attr('src', data.forecast.forecastday[1].day.condition.icon)
    // End

    // 3rd Day

    $("#day3").text(dayAftertom)
    $("#day3degree").text(data.forecast.forecastday[2].day.maxtemp_c + "c")
    $(".lowDeg3").text(data.forecast.forecastday[2].day.mintemp_c + "c")
    $("#status3").text(data.forecast.forecastday[2].day.condition.text)
    $("#weather-Img3").attr('src', data.forecast.forecastday[2].day.condition.icon)
    // End
  }

  // Event listener for the search button click
  city.addEventListener("input", updateDOM);

 


}); // Loading Function End



