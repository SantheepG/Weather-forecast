import axios from "axios";
import React, { Component } from "react";
import Search from "../Search/Search";
import { OPEN_WEATHER_API_KEY } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Main.css";
import TodayMain from "../TodayMain/TodayMain";
import Wind from "../Wind/Wind";
import Temp from "../Temp/Temp";
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 51.509865,
      lng: -0.118092,
      //current
      id: 0,
      city: "",
      country: "",
      time_zone: 0,
      dt: 0,
      current_temp: 0,
      real_feel: 0,
      min_temp: 0,
      max_temp: 0,
      humidity: 0,
      visibility: 0,
      sun_rise: 0,
      sunset: 0,
      widnd_speed: 0,
      wind_deg: 0,
      weather_description: "",
      cloud_icon: "",

      //Forecast Array
      frodcast_array: [],
    };
    this.searchChangHandler = this.searchChangHandler.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  //Default location -
  componentDidMount() {
    this.callApi(this.state.lat, this.state.lng);
  }

  callApi(latitude, longtude) {
    //current
    let current_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    axios
      .get(current_url)
      .then((resposnse_current) => {
        //console.log(resposnse_current.data);

        this.setState({
          //current data
          id: resposnse_current.data.id,
          city: resposnse_current.data.name,
          country: resposnse_current.data.sys.country,
          time_zone: resposnse_current.data.timezone,
          dt: resposnse_current.data.dt,
          current_temp: resposnse_current.data.main.temp,
          real_feel: resposnse_current.data.main.feels_like,
          min_temp: resposnse_current.data.main.temp_min,
          max_temp: resposnse_current.data.main.temp_max,
          humidity: resposnse_current.data.main.humidity,
          visibility: resposnse_current.data.visibility,
          sun_rise: resposnse_current.data.sys.sunrise,
          sunset: resposnse_current.data.sys.sunset,
          widnd_speed: resposnse_current.data.wind.speed,
          wind_deg: resposnse_current.data.wind.deg,
          weather_description: resposnse_current.data.weather[0].description,
          cloud_icon: resposnse_current.data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //3-hour 5 days frodcast
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longtude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
    axios
      .get(url)
      .then((resposnse) => {
        this.setState({
          frodcast_array: resposnse.data.list,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  notify = () =>
    toast.success("Lorem ipsum dolor", {
      theme: "colored",
    });

  //Handle Search Bar
  searchChangHandler(searchData) {
    this.state.lat = searchData.latitude;
    this.state.lng = searchData.longitude;
    this.setState({
      lat: searchData.latitude,
      lng: searchData.longitude,
    });
    this.callApi(this.state.lat, this.state.lng);
  }

  clickHandler() {
    let latitude;
    let longitude;
    if (this.state.lat !== latitude) {
      this.state.lat = latitude;
      this.state.lng = longitude;
      this.setState({
        lat: latitude,
        lng: longitude,
      });
      this.callApi(this.state.lat, this.state.lng);
    }
  }

  getCurrentLocation() {
    let posLat = 0;
    let posLng = 0;
    let isLocated = false;
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser", {
        theme: "colored",
      });
    } else {
      isLocated = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          posLat = position.coords.latitude;
          posLng = position.coords.longitude;
          this.callApi(posLat, posLng);
          this.state.lat = position.coords.latitude;
          this.setState({
            lat: posLat,
            lng: posLng,
          });
        },
        () => {
          toast.error("Unable to retrieve your location", {
            theme: "colored",
          });
        }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <Search onSearchChange={this.searchChangHandler} className="search" />
        </div>

        <div className="content">
          <Temp
            className="temp"
            temp={this.state.current_temp}
            min_temp={this.state.min_temp}
            max_temp={this.state.max_temp}
            feels_like={this.state.real_feel}
            temp_array={this.state.frodcast_array}
            timezone={this.state.time_zone}
            dt={this.state.dt}
          />
          <TodayMain
            className="todayMain"
            city={this.state.city}
            country={this.state.country}
            timezone={this.state.time_zone}
            dt={this.state.dt}
            temp={this.state.current_temp}
            cloud_icon={this.state.cloud_icon}
            weather_description={this.state.weather_description}
          />
          <Wind
            className="wind"
            wind_speed={this.state.widnd_speed}
            wind_deg={this.state.wind_deg}
            humidity={this.state.humidity}
            visibility={this.state.visibility}
            timezone={this.state.time_zone}
            dt={this.state.dt}
          />
        </div>
        <div className="footer">
          <div className="copyright">
            ®All rights reserved - Santheep's craft
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default Main;
