import React, { Component } from 'react';

import WeatherList from './components/WeatherList/WeatherList';
import WeatherSearch from './containers/WeatherSearch/WeatherSearch';
import ToggleButton from './components/ToggleButton/ToggleButton';
import Header from './components/Header/Header';
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
        <Header />
        <WeatherSearch addResult={this.addResult}/>
        <ToggleButton toggleFC={this.toggleFC}/>
        <hr />
        <WeatherList 
          results={this.state.results} 
          celcius={this.state.celcius}
        />
      </div>
    );
  }
}

export default App;
