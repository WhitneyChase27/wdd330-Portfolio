const api = {
    key: "61c293d53ca42dd0c0518041d30bf845",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    //press the enter key
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    //accessing the api
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

    
  function displayResults (weather) {
    //retrevie and set the localstorage variables
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    localStorage.setItem("city", city.innerText);
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    localStorage.setItem("date", dateBuilder(now));
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;
    localStorage.setItem("temp", temp.innerHTML);
  
    let weatherEl = document.querySelector('.current .weather');
    weatherEl.innerText = weather.weather[0].main;
    localStorage.setItem("weatherEl", weatherEl.innerText);
    
    let hiLow = document.querySelector('.hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
    localStorage.setItem("hiLow", hiLow.innerText);

    //retreive from localstorage
   let cityData = localStorage.getItem("city");
   console.log("CITY: " + cityData);
 
   let hiLowData = localStorage.getItem("hiLow");
   console.log("CITY: " + hiLowData);
   
   let weatherElData = localStorage.getItem("weatherEl");
   console.log("CITY: " + weatherElData);
   
   let tempData = localStorage.getItem("temp");
   console.log("CITY: " + tempData);
   
   let dateData = localStorage.getItem("date");
   console.log("CITY: " + dateData);

  }

  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }