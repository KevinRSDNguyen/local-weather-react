import React from 'react';

const toggleButton = ({toggleFC}) => {
  return (
    <button onClick={toggleFC}>Toggle F/C</button>
  );
};

export default toggleButton;