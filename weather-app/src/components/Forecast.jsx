import React from "react";
import ForecastCard from "./ForecastCard";

export default function Forecast({ data, isCelsius }) {
  return (
    <>
      <h3 style={{textDecoration: "underLine"}}>6-Day Forecast</h3>
      <div className="row justify-content-center g-3 mt-4">
  {data.map((day, idx) => (
    <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
      <ForecastCard
        date={day.date}
        weather={day.weather}
        minTemp={day.minTemp}
        maxTemp={day.maxTemp}
        background={day.background}
        isCelsius={isCelsius}
      />
    </div>
  ))}
</div>
    </>
  );
}