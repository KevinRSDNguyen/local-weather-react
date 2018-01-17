import React from 'react';

const weatherResult = ({weather}) => {
  let location, temperature, conditions = null;
  if (weather) {
    location = weather.name;
    temperature = weather.main.temp;
    conditions = weather.weather[0].main;
  }
  return (
    <div>
      <p>{location}</p>
      <p>{temperature}</p>
      <p>{conditions}</p>
    </div>
  );
};

export default weatherResult;