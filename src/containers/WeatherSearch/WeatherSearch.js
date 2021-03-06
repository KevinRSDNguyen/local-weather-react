import React, { Component } from "react";
import Aux from "./../../hoc/Auxx/Auxx";
import axios from "axios";

const apiKey = "78981c43e4b2ded34b065dfb22405f75";

class WeatherSearch extends Component {
  state = {
    input: "",
    weatherData: {
      location: null,
      temperature: null,
      conditions: null,
      icon: null
    }
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  createWeatherObj = ({ name: city, main, weather, sys }) => {
    let weatherObj = {};
    weatherObj.location = { city, country: sys.country };
    weatherObj.temperature = main.temp;
    weatherObj.conditions = weather[0].main;
    weatherObj.icon = weather[0].icon;
    return weatherObj;
  };
  onFormSubmit = event => {
    event.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${
      this.state.input
    }&units=imperial&appid=${apiKey}`;
    axios
      .get(url)
      .then(({ data }) => {
        const updatedWeatherData = this.createWeatherObj(data);
        this.setState(
          prevState => {
            return { weatherData: updatedWeatherData };
          },
          () => {
            this.props.addResult(this.state.weatherData);
            this.setState({ weatherData: null, input: "" });
          }
        );
      })
      .catch(error => {
        alert("That city could not be found");
      });
  };
  currentLocation = () => {
    axios
      .get("https://ipinfo.io/")
      .then(({ data }) => {
        //API gives us co-ords as string, this will parse them to Number
        const LatLong = data.loc.split(",").map(coord => {
          return Number(coord);
        });
        const [lat, long] = LatLong;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
        return axios.get(url);
      })
      .then(({ data }) => {
        const updatedWeatherData = this.createWeatherObj(data);
        this.setState(
          prevState => {
            return { weatherData: updatedWeatherData };
          },
          () => {
            this.props.addResult(this.state.weatherData);
            this.setState({ weatherData: null });
          }
        );
      });
  };
  render() {
    return (
      <Aux>
        <form onSubmit={this.onFormSubmit} className="mb-3">
          <input
            className="form-control"
            type="text"
            autoFocus
            value={this.state.input}
            onChange={this.onInputChange}
            placeholder="Enter a city..."
          />
        </form>
        <div className="d-flex justify-content-around">
          <button
            onClick={this.currentLocation}
            className="btn btn-secondary btn-sm"
          >
            <i className="fas fa-location-arrow" /> Use current location
          </button>
          <button
            onClick={this.props.toggleFC}
            className="btn btn-secondary btn-sm"
          >
            <i className="fas fa-toggle-on" /> Toggle F/C
          </button>
        </div>
      </Aux>
    );
  }
}

export default WeatherSearch;
