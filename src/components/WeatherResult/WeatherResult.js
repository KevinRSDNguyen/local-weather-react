import React from 'react';

const weatherResult = ({ location, temperature, conditions, celcius }) => {
  return (
    <div>
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