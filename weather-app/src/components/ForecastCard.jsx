import React from "react";

export default function ForecastCard({ data, isCelsius, background }) {
  const temp = isCelsius
    ? `${Math.round(data.main.temp - 273.15)}°C`
    : `${Math.round((data.main.temp - 273.15) * 9 / 5 + 32)}°F`;

  const date = new Date(data.dt_txt).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className="card text-dark text-center"
      style={{
        width: "200px",
        backgroundImage: `url(/backgrounds/${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"}}>
      <div className="card-body">
        <h6 className="card-title">{date}</h6>
        <p className="card-text">{data.weather[0].main}</p>
        <p className="card-text">{temp}</p>
      </div>
    </div>
  );
}
