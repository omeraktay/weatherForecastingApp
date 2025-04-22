import React from "react";
import { Button } from "react-bootstrap";

export default function ToggleTemp({ isCelsius, setIsCelsius }) {
  return (
    <Button
      variant="outline-light"
      className="mb-3"
      onClick={() => setIsCelsius(!isCelsius)}>
      Switch to {isCelsius ? "°F" : "°C"}
    </Button>
  );
}
