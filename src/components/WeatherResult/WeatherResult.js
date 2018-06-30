import React from "react";

const weatherResult = ({
  location,
  temperature,
  conditions,
  celcius,
  icon
}) => {
  return (
    <div className="col-md-3 col-sm-6 mb-3">
      <div className="card text-center">
        <div className="bg-light">
          <img
            src={`https://openweathermap.org/img/w/${icon}.png`}
            alt=""
            style={{ height: "50px", width: "50px" }}
            className="m-auto"
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="fas fa-map-marker-alt" /> {location.city},{" "}
            {location.country}
          </li>
          <li className="list-group-item">
            <i className="fas fa-thermometer-half" />{" "}
            {celcius
              ? `${(((temperature - 32) * 5) / 9).toFixed(2)} C`
              : `${temperature} F`}
          </li>
          <li className="list-group-item">{conditions}</li>
        </ul>
      </div>
    </div>
  );
};

export default weatherResult;
