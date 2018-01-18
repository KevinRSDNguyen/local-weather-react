import React, { Component } from 'react';

import WeatherList from './components/WeatherList';
import WeatherSearch from './containers/WeatherSearch';
import './App.css';

class App extends Component {
  state = {
    results: [],
    celcius: false
  };
  addResult = (result) => {
    this.setState((prevState) => {
      const duplicateCity = prevState.results.find(r => {
        return r.location === result.location;
      });
      //Only adds weather data for city if it has not been looked up before
      if (!duplicateCity) { 
        return {
          results: prevState.results.concat(result)
        };
      }
    });
  }
  toggleFC = () => {
    this.setState((prevState) => {
      return {
        celcius: !prevState.celcius
      };
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Local Weather App</h1>
        <p>Enter in a city of your choice or use your current location.</p>
        <WeatherSearch addResult={this.addResult}/>
        <WeatherList 
          results={this.state.results} 
          celcius={this.state.celcius}
        />
        <button onClick={this.toggleFC}>Toggle F/C</button>
      </div>
    );
  }
}

export default App;
