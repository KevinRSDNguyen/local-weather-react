import React from 'react';
import './WeatherResult.css';

const weatherResult = ({ location, temperature, conditions, celcius, icon }) => {
  return (
    <div className="weather-card">
      <img src={`http://openweathermap.org/img/w/${icon}.png`} />
      <p>{location}</p>
      <p>
        {celcius ? `${((temperature - 32) * 5 / 9).toFixed(2)} C`
          : `${temperature} F`}
      </p>
      <p>{conditions}</p>
    </div>
  );
};

export default weatherResult;