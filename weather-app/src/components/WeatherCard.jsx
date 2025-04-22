import React from "react";

export default function WeatherCard({ data, isCelsius, background }) {
  const temp = isCelsius
    ? Math.round(data.main.temp - 273.15)
    : Math.round(((data.main.temp - 273.15) * 9) / 5 + 32);

  return (
    <>
      <div
        className="card text-dark mb-4 mx-auto"
        style={{
          backgroundImage: `url(/backgrounds/${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "400px"
        }}
      >
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
          <p className="card-text display-4">{temp}°{isCelsius ? "C" : "F"}</p>
          <p className="card-text">{data.weather[0].description}</p>
        </div>
      </div>
    </>
  );
}

