class Fetch {
    async getCurrent(input) {
      const myKey = "61c293d53ca42dd0c0518041d30bf845";
  
      //make request to url
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
      );
  
      const data = await response.json();
  
      console.log(data);
  
      return data;
    }
  }
