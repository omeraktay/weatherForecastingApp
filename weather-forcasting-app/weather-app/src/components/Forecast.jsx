import React from "react";
import ForecastCard from "./ForecastCard";

export default function Forecast({ data, isCelsius }) {
  return (
    <>
      <h3 style={{textDecoration: "underline"}}>5 Days Forecast</h3>
      <div className="forecast d-flex flex-wrap justify-content-center gap-3 mt-4">
        {data.map((item, index) => (
          <ForecastCard
            key={index}
            data={item}
            isCelsius={isCelsius}
            background={item.background} 
          />
        ))}
      </div>
    </>
  );
}

