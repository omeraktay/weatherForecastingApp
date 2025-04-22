import React from "react";
import ForecastCard from "./ForecastCard";

export default function Forecast({ data, isCelsius }) {
  return (
    <>
      <h3 style={{textDecoration: "underLine"}}>6-Day Forecast</h3>
      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4 mb-5">
        {data.map((day, idx) => (
          <ForecastCard
            key={idx}
            date={day.date}
            weather={day.weather}
            minTemp={day.minTemp}
            maxTemp={day.maxTemp}
            background={day.background}
            isCelsius={isCelsius}
          />
        ))}
      </div>
    </>
  );
}