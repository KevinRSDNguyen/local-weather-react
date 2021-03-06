import React from "react";
import WeatherResult from "./../WeatherResult/WeatherResult";

const weatherList = props => {
  const weatherResults = props.results.map((r, index) => {
    return <WeatherResult key={index} {...r} {...props} />;
  });
  return <div className="row">{weatherResults}</div>;
};

export default weatherList;
