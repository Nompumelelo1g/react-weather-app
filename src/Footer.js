import React from "react";
import "./App.css"

export default function Footer() {
  return (
    <div className="footer">
      <p className="opacity-75 code-link">
        <a
          href="https://github.com/Nompumelelo1g/reactWeatherApp"
          target="_blank"
          rel="noreferrer"
        >
          Open-source code
        </a>{" "}
        by Nompumelelo Ncokwane
      </p>
    </div>
  );
}