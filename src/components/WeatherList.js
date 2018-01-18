import React from 'react';
import WeatherResult from './WeatherResult';

const weatherList = ({results}) => {
  const weatherResults = results.map((r, index) => {
    return (
      <WeatherResult key={index} {...r}/>
    );
  });
  return (
    <div className="weather-list">
      {weatherResults}
    </div>
  );
};

export default weatherList;