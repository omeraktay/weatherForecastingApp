import React from "react";

export default function ForecastCard({ date, weather, minTemp, maxTemp, isCelsius, background }) {
  const convert = (temp) =>
    isCelsius
      ? `${Math.round(temp - 273.15)}°C`
      : `${Math.round((temp - 273.15) * 9 / 5 + 32)}°F`;

  const readableDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className="text-dark text-center"
      style={{
        width: "400px",
        backgroundImage: `url(/backgrounds/${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="card-body" style={{ padding: "1rem", borderRadius: "15px" }}>
        <h6 className="card-title" style={{ fontSize: "1rem", fontWeight: "bold" }}>{readableDate}</h6>
        <p className="card-text" style={{ fontSize: "0.9rem" }}>{weather}</p>
        <p className="card-text" style={{ fontSize: "0.9rem" }}>
          <strong>Min:</strong> {convert(minTemp)} <br />
          <strong>Max:</strong> {convert(maxTemp)}
        </p>
      </div>
    </div>
  );
}

