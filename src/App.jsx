import React,{ useEffect, useState } from "react";

// Importend Companenta ========>
import Descripton from "./companents/Descripton";
import { getFomattendWeatherData } from "./weatherService";

// Importend Image ======>
import coldBg from "./assets/cold.jpeg";
import hotBg from "./assets/hot.webp";

function App() {
  const [city, setCity] = useState("jomboy")
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFomattendWeatherData(city,units);
      setWeather(data);
      
      // dynamic bg
      const threshold = units ==="metric" ? 5 : 60;
      if (data.temp <= threshold ) setBg(coldBg)
      else(setBg(hotBg))

    };
    fetchWeatherData();
  }, [units,city]);

  const handsUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit  = button.innerText.slice(1)

    const isCelsius = currentUnit === "C"
    button.innerText = isCelsius ? "°F" : "°C"
    setUnits(isCelsius ? "metric" : "imperial")
  }

  const enterKeyPressed = (e) => {
    if(e.keyCode ===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {
          weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city..." />
              <button onClick={(e) => handsUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{weather.name}, {weather.country} </h3>
                <img
                  src={weather.iconUrl}
                  alt="weather Image"
                />
                <h3>{`${weather.description}`} </h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`} </h1>
              </div>
            </div>

            {/* bottom description */}
            <Descripton weather={weather} units={units} />
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
