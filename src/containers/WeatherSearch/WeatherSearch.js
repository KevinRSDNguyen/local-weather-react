import React, { Component } from 'react';
import Aux from './../../hoc/Auxx/Auxx';
import './WeatherSearch.css';
import axios from 'axios';

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
    this.setState({ input: event.target.value })
  }
  createWeatherObj = ({ name, main, weather }) => {
    let weatherObj = {};
    weatherObj.location = name;
    weatherObj.temperature = main.temp;
    weatherObj.conditions = weather[0].main;
    weatherObj.icon = weather[0].icon;
    return weatherObj;
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=imperial&appid=${apiKey}`;
    axios.get(url)
      .then(({ data }) => {
        const updatedWeatherData = this.createWeatherObj(data);
        this.setState((prevState) => {
          return { weatherData: updatedWeatherData };
        }, () => {
          this.props.addResult(this.state.weatherData);
          this.setState({ weatherData: null, input: '' });
        });
      })
      .catch(error => {
        alert('That city could not be found');
      });
  }
  currentLocation = () => {
    axios.get('https://ipinfo.io/')
      .then(({ data }) => {
        const LatLong = data.loc.split(',').map(coord => {
          return Number(coord);
        });
        const lat = LatLong[0];
        const long = LatLong[1];
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
        axios.get(url)
          .then(({ data }) => {
            const updatedWeatherData = this.createWeatherObj(data);
            this.setState((prevState) => {
              return { weatherData: updatedWeatherData };
            }, () => {
              this.props.addResult(this.state.weatherData);
              this.setState({ weatherData: null })
            });
          });
      });
  }
  render() {
    return (
      <Aux>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="weather-input"
            type="text"
            autoFocus
            value={this.state.input}
            onChange={this.onInputChange}
          />
        </form>
        <button onClick={this.currentLocation} style={{ marginRight: '30px' }}>
          Use current location
        </button>
      </Aux>
    );
  }
};

export default WeatherSearch;