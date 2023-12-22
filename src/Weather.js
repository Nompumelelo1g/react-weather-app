import React, { useState } from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import "./Weather.css";
import "bootstrap/dist/css/bootstrap.css";


export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherD, setWeatherD] = useState({ loaded: false });
 


  function displayingWeather(response) {
    console.log(response.data);
    setWeatherD({
      loaded: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      // icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      date: new Date (response.data.dt * 1000),
    });
  }

  function handleSubmission(event) {
    event.preventDefault();
    searching();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function searching(){
    const apiKey = "3dce9b1c66837262a25b3f448d354a76";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayingWeather);
  }

  if (weatherD.loaded){
    return (
    <div className="weather-container">
      <form onSubmit={handleSubmission} className="weather-form">
        <div className="row">
          <div className="col-9">
            <input type="text" placeholder="Enter city..."  className="p-2" autoFocus="on" onChange={updateCity} />
          </div>
          <div className="col-3">
            <input type="submit" value="Search" className="btn btn-primary w-100 p-2" />
          </div>         
        </div>    
      </form>
      <WeatherDetails data= {weatherD} />
    </div>
  );
  }else{
    searching();
    return "Please wait...";
  } 
}
