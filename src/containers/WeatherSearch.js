import React, {Component} from 'react';

class WeatherSearch extends Component {
  state = {
    city: ''
  };
  onCityChange = (event) => {
    this.setState({city: event.target.value})
  }
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.searchedLocation(this.state.city);
    this.setState({city:''});
  }
  render(){
    return(
      <form onSubmit={this.onFormSubmit}>
        <input 
            type="text"
            autoFocus
            value={this.state.city}
            onChange={this.onCityChange}
          />
      </form>
    );
  }
};

export default WeatherSearch;