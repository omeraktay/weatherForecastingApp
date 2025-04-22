import React from "react";
import Card from "react-bootstrap/Card";
import { FaWind, FaTint, FaSun, FaMoon } from "react-icons/fa";

export default function ExtraDetailsCard({ data }) {
  const { wind, humidity, sunrise, sunset } = data;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="my-3 bg-dark text-white shadow-lg">
      <Card.Body className="d-flex flex-wrap justify-content-around text-center">
        <div className="p-2">
          <FaWind size={30} />
          <p className="mb-0">Wind</p>
          <strong>{wind.speed} m/s</strong>
        </div>
        <div className="p-2">
          <FaTint size={30} />
          <p className="mb-0">Humidity</p>
          <strong>{humidity}%</strong>
        </div>
        <div className="p-2">
          <FaSun size={30} />
          <p className="mb-0">Sunrise</p>
          <strong>{formatTime(sunrise)}</strong>
        </div>
        <div className="p-2">
          <FaMoon size={30} />
          <p className="mb-0">Sunset</p>
          <strong>{formatTime(sunset)}</strong>
        </div>
      </Card.Body>
    </Card>
  );
}
