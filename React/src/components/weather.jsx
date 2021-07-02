import React, { Component } from "react";
//import bootstrap from "bootstrap/dist/css/bootstrap.css";

const WeatherPage = (props) => {
  return (
    <div>
      <marquee scrollamount="15">
        <b>Welcome! </b> For weather info, Please Select <b>CityName</b> and
        <b> Numbers of days</b> to get the information
      </marquee>
      <form className="form" onSubmit={props.load_weather}>
        <select className="select" name="city" size="1">
          <option value="London">London</option>
          <option value="Ghaziabad">Gzb</option>
          <option value="Delhi">Delhi</option>
          <option value="Meerut">Meerut</option>
          <option value="Hapur">Hapur</option>
          <option value="Noida">Noida</option>
        </select>
        <select className="select" name="days">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <br></br>
        <button className="submitButton">Submit</button>
      </form>

      <div className="card">
        {props.error ? <h1>{props.error}</h1> : null}
        {props.city ? <h1 id="cityy">City: {props.city}</h1> : null}
        {props.country ? <p>Country: {props.country}</p> : null}
        {props.curr_temp ? <p>Current Temperature: {props.curr_temp}</p> : null}
        {props.wind_speed ? <p>Wind Speed: {props.wind_speed}</p> : null}
        {props.curr_weather ? (
          <p>Current Weather: {props.curr_weather}</p>
        ) : null}
        {props.forecasted_data ? <p>{props.forecasted_data}</p> : null}
      </div>
    </div>
  );
};
export default WeatherPage;
