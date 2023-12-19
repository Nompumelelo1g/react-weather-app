import React, { useState } from "react";
import axios from "axios";
import "./App.css";


export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  function displayingWeather(response) {
    setLoaded(true);
    setWeather({
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      date: response.data.dt
    });
  }

  function handleSubmission(event) {
    event.preventDefault();
    setLoading(true);
    let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayingWeather);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  return (
    <div className="weather-container">
      <form onSubmit={handleSubmission} className="weather-form">
        <input type="text" placeholder="Enter city" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      {loading && <p>Loading...</p>}
      {loaded && (
        <ul className="weather-details">
          <h2>{weather.name}</h2>
          <li>Last updated: {weather.date}</li>
          <li>Temperature: {Math.round(weather.temperature)} °C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity} %</li>
          <li>Wind: {weather.wind} km/h</li>
          <img src={weather.icon} alt={weather.description} />
        </ul>
      )}
    </div>
  );
}