import React from 'react';

const weatherResult = ({location, temperature, conditions}) => {
  return (
    <div>
      <p>{location}</p>
      <p>{temperature} F</p>
      <p>{conditions}</p>
    </div>
  );
};

export default weatherResult;