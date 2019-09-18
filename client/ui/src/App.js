import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: "",
      temp: "",
      humidity: "",
      pressure: "",
      temp_min: "",
      temp_max: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/weather", this.state)
      .then(response => {

        this.setState({temp: response.data.main.temp});
        this.setState({pressure: response.data.main.pressure});
        this.setState({humidity: response.data.main.humidity});
        this.setState({temp_min: response.data.main.temp_min});
        this.setState({temp_max: response.data.main.temp_max});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { latitude, longitude } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <label className="latitude">
              Latitude:
              <input
                type="text"
                name="latitude"
                value={latitude}
                onChange={this.changeHandler}
              />
            </label>

            <label className="longitude">
              Longitude:
              <input
                type="text"
                name="longitude"
                value={longitude}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <button
            className="submitBtn"
            type="submit"
            onChange={this.changeHandler}
          >
            Submit
          </button>
        </form>

        <div>
          <table>
            <tbody>
              <tr>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Temp Max</th>
                <th>Temp Min</th>
              </tr>
              <tr>
                <td>{this.state.temp}</td>
                <td>{this.state.pressure}</td>
                <td>{this.state.humidity}</td>
                <td>{this.state.temp_min}</td>
                <td>{this.state.temp_max}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
