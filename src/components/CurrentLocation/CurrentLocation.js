import React from 'react';

const currentLocation = ({currentLocation}) => {
  return (
    <button onClick={currentLocation}>Use current location</button>
  );
};

export default currentLocation;