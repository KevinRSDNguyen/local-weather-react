import React, { Component } from 'react';

import WeatherList from './components/WeatherList';
import WeatherSearch from './containers/WeatherSearch';
import './App.css';

class App extends Component {
  state = {
    results: []
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
  render() {
    return (
      <div className="App">
        <h1>Local Weather App</h1>
        <p>Enter in a city of your choice or use your current location.</p>
        <WeatherSearch addResult={this.addResult}/>
        <WeatherList results={this.state.results}/>
      </div>
    );
  }
}

export default App;
