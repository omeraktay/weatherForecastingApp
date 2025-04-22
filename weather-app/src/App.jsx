import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ToggleTemp from "./components/ToggleTemp";
import ErrorMessage from "./components/ErrorMessage";
import DetailsCard from "./components/DetailsCard";
import Footer from "./components/Footer"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_KEY = "fcad8b236e285e7062bae629b3cf117b";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState("clear.gif");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocationAndFetch();
  }, []);

  const getLocationAndFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setLoading(true);
            const weatherRes = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            setCity(weatherRes.data.name);
            fetchWeather(weatherRes.data.name);
          } catch (err) {
            setError("Unable to fetch location-based weather.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Geolocation permission denied. Please enter a city manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeather = async (searchCity = city) => {
    try {
      setError(null);
      setLoading(true);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`
      );

      const backgrounds = {
        Clear: "sunny.gif",
        Clouds: "cloudy.gif",
        Rain: "rain.gif",
        Snow: "snow.gif",
        Thunderstorm: "storm.gif",
      };

      const main = weatherRes.data.weather[0].main;
      const bg = backgrounds[main] || "default.gif";
      setBackground(bg);

      setWeatherData({
        ...weatherRes.data,
        background: bg,
        wind: weatherRes.data.wind,
        humidity: weatherRes.data.main.humidity,
        sunrise: weatherRes.data.sys.sunrise,
        sunset: weatherRes.data.sys.sunset,
      });

      // Group forecast data by date
      const dailyForecasts = {};
      forecastRes.data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyForecasts[date]) dailyForecasts[date] = [];
        dailyForecasts[date].push(item);
      });

      // Compute min/max temp per day and get weather background
      const forecastWithMinMax = Object.entries(dailyForecasts).map(([date, entries]) => {
        let minTemp = Infinity;
        let maxTemp = -Infinity;
        let main = "Clear";

        entries.forEach((entry) => {
          const temp = entry.main.temp;
          if (temp < minTemp) minTemp = temp;
          if (temp > maxTemp) maxTemp = temp;
          if (entry.weather[0]) main = entry.weather[0].main;
        });

        const forecastBg = backgrounds[main] || "default.gif";
        return {
          date,
          minTemp,
          maxTemp,
          background: forecastBg,
          weather: main,
        };
      });

      setForecastData(forecastWithMinMax);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="app d-flex flex-column min-vh-100" style={{ backgroundColor: "#1d4949" }}>
      <div className="container py-4 text-center text-white flex-grow-1">
        <h1 className="mb-4">Weather Forecast App</h1>
        <form onSubmit={handleSearch} className="d-flex mb-3 justify-content-center gap-2">
          <input
            className="form-control w-50"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="btn btn-outline-warning" type="submit">
            Search
          </button>
        </form>
        <ToggleTemp isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        {error && <ErrorMessage message={error} />}
        {loading && (
          <div className="my-4">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!loading && weatherData && (
          <>
            <WeatherCard data={weatherData} isCelsius={isCelsius} background={weatherData.background} /> <hr />
            <DetailsCard data={weatherData} /> < hr />
            <Forecast data={forecastData} isCelsius={isCelsius} />
          </>
        )}
      </div>
        <Footer />
    </div>
  );
}