import React, { useState } from 'react'
import "./WeatherApp.css"
import search_icon from "../Assets/search.png"
import cloud_icon from "../Assets/cloud.png"
import clear_icon from "../Assets/clear.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import drizzle_icon from "../Assets/drizzle.png"



const WeatherApp = () => {
  let api_key = "988f172646aa68f86328a2d6e1dcfd4f"
  const [wicon, setWicon] = useState(cloud_icon);
  const search = async ()=>{
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value==="")
    { alert("City not entered");
      return "City not found";
    }

    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`
    let  response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")

    // Assuming 'data' is the variable containing the information received from the API

    if (data.cod && data.cod !== "404") {
      // Valid location information
      humidity[0].innerHTML = data.main.humidity + "%";
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
      wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
      location[0].innerHTML = data.name;


      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
      {
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
      {
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
      {
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
      {
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
      {
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
      {
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
      {
        setWicon(snow_icon);
      }
      else
      {
        setWicon(clear_icon);
      }
    
    } else if (data.cod && data.cod === "404" && data.message && data.message.toLowerCase() === "city not found") {
      // City not found
      humidity[0].innerHTML = "N/A";
      temperature[0].innerHTML = "N/A";
      wind[0].innerHTML = "N/A";
      location[0].innerHTML = "City not found";
    } else {
      // Handle other error cases
      alert("Error fetching data");
    }

  }


  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='search'/>
        <div className="search-icon">
          <img src={search_icon} alt="search-icon" onClick={()=> search()}/>
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="cloud-icon" />
      </div>
      <div className="weather-temp">
        24°c
      </div>
      <div className="weather-location">Kollam</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className='icon' alt="humidity-icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind-icon" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>      
      </div>

    </div>
  )
}

export default WeatherApp