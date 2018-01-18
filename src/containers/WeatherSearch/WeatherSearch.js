import React, {Component} from 'react';
import './WeatherSearch.css';
import axios from 'axios';
import {createWeatherObj} from './../../shared/utility';

const apiKey = '78981c43e4b2ded34b065dfb22405f75';

class WeatherSearch extends Component {
  state = {
    input: '',
    weatherData: {
      location: null,
      temperature: null,
      conditions: null,
      icon: null
    }
  };
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=imperial&appid=${apiKey}`;
    axios.get(url)
      .then(({data}) => {
        const updatedWeatherData = createWeatherObj(this.state.weatherData, data);
        this.setState((prevState) => {
          return {weatherData: updatedWeatherData};
        }, () => {
          this.props.addResult(this.state.weatherData);
          this.setState({weatherData: null, input: ''});
        });
      })
      .catch(error => {
        alert('That city could not be found');
      });
  }
  currentLocation = () => {
    if (!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
      axios.get(url)
        .then(({data}) => {
          const updatedWeatherData = createWeatherObj(this.state.weatherData, data);
          this.setState((prevState) => {
            return {weatherData: updatedWeatherData};
          }, () => {
            this.props.addResult(this.state.weatherData);
            this.setState({weatherData: null})
          });
        });

    }, function () { //2nd callback for if error occurs
      alert('Unable to fetch location');
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
              className="weather-input" 
              type="text"
              autoFocus
              value={this.state.input}
              onChange={this.onInputChange}
            />
        </form>
        <button onClick={this.currentLocation}>Use current location</button>
      </div>
    );
  }
};

export default WeatherSearch;