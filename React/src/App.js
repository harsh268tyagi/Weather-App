// import { render } from "@testing-library/react";
import React, { Component } from "react";
import "./App.css";
import WeatherPage from "./components/weather";
// const [pusheddata, setpusheddata] = React.useState([]);

class WeatherApp extends Component {
  state = {
    city: undefined,
    country: undefined,
    curr_temp: undefined,
    wind_speed: undefined,
    curr_weather: undefined,
    query: undefined,
    days: undefined,
    forecasted_day: undefined,
    forecasted_temp: undefined,
    forecasted_weather: undefined,
    fdata: [],
    error: undefined,
  };

  getWeather = async (e) => {
    e.preventDefault(); // to prevent default function of button
    const city = e.target.elements.city.value;
    const days = e.target.elements.days.value;

    const url =
      "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" +
      city +
      "&days=" +
      days;
    const apicall = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6c197cd1fbmshecc3b0b6c3b8dcdp196a49jsnd6a739d34edb",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    });
    const response = await apicall.json();
    console.log(response);
    try {
      this.setState({ fdata: [] });
      for (let d = 0; d < days; d++) {
        this.setState({
          forecasted_day: [d + 1],
          forecasted_temp: response.forecast.forecastday[d].day.avgtemp_c,

          forecasted_weather:
            response.forecast.forecastday[d].day.condition.text,
        });

        this.setState({
          fdata: [
            ...this.state.fdata,
            [
              "NextDay" + this.state.forecasted_day + "   ",
              "Weather:" + this.state.forecasted_weather,
              "     ",
              "Temperature:" + this.state.forecasted_temp,
            ],
          ],
        });
      }
      this.setState({
        curr_temp: response.current.temp_c,
        city: response.location.name,
        wind_speed: response.current.wind_kph,
        country: response.location.country,
        curr_weather: response.current.condition.text,
        days: e.target.elements.days.value,
        error: undefined,
      });
    } catch {
      this.setState({
        city: undefined,
        country: undefined,
        curr_temp: undefined,
        wind_speed: undefined,
        curr_weather: undefined,
        query: undefined,
        days: undefined,
        forecasted_day: undefined,
        forecasted_temp: undefined,
        forecasted_weather: undefined,
        fdata: [],
        error: response.error.message,
      });
      console.log("error");
    }
  };
  render_forecast = () => {
    return (
      <>
        {this.state.fdata
          ? this.state.fdata.map((fodata) => <div>{fodata}</div>)
          : null}
      </>
    );
  };

  render() {
    return (
      <React.Fragment>
        <WeatherPage
          city={this.state.city ? this.state.city : null}
          country={this.state.country}
          curr_temp={this.state.curr_temp}
          wind_speed={this.state.wind_speed}
          curr_weather={this.state.curr_weather}
          query={this.state.query}
          days={this.state.days}
          error={this.state.error}
          load_weather={this.getWeather}
          forecasted_data={this.render_forecast()}
        />
      </React.Fragment>
    );
  }
}

export default WeatherApp;
