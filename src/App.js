import React, { Component } from 'react';
import axios from 'axios';

import WeatherResult from './components/WeatherResult';
import WeatherSearch from './containers/WeatherSearch';
import './App.css';

const apiKey = '78981c43e4b2ded34b065dfb22405f75';

class App extends Component {
  state = {
    weather: null
  };
  currentLocation = () => {
    if (!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
      axios.get(url)
        .then(response => {
          this.setState({weather: response.data});
        });

    }, function () { //2nd callback for if error occurs
      alert('Unable to fetch location');
    });
  }
  searchedLocation = (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(url)
      .then(response => {
        this.setState({weather: response.data});
      })
      .catch(error => {
        alert('That city could not be found');
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Local Weather App</h1>
        <p>Enter in a city of your choice or use your current location.</p>
        <WeatherSearch searchedLocation={this.searchedLocation}/>
        <button onClick={this.currentLocation}>Use current location</button>
        <WeatherResult weather={this.state.weather}/>
      </div>
    );
  }
}

export default App;
