import React, { Component } from "react";

import WeatherList from "./components/WeatherList/WeatherList";
import WeatherSearch from "./containers/WeatherSearch/WeatherSearch";
import "./App.css";

class App extends Component {
  state = {
    results: [],
    celcius: false
  };
  addResult = result => {
    this.setState(prevState => {
      const duplicateCity = prevState.results.find(r => {
        return r.location.city === result.location.city;
      });
      //Only adds weather data for city if it has not been looked up before
      if (!duplicateCity) {
        return {
          results: prevState.results.concat(result)
        };
      }
    });
  };
  toggleFC = () => {
    this.setState(prevState => {
      return {
        celcius: !prevState.celcius
      };
    });
  };
  render() {
    return (
      <section>
        <div className="dark-overlay">
          <div className="container">
            <div className="row p-3">
              <div className="col-md-9 m-auto">
                <h1 className="display-4 text-center text-light">
                  Local Weather App
                </h1>
                <WeatherSearch
                  addResult={this.addResult}
                  toggleFC={this.toggleFC}
                />
              </div>
            </div>
            <hr />
            <WeatherList
              results={this.state.results}
              celcius={this.state.celcius}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
