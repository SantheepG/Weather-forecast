import React from "react";
import "./Temp.css";
import "react-circular-progressbar/dist/styles.css";
import { UilTemperatureQuarter } from "@iconscout/react-unicons";
const Temp = (props) => {
  //temp
  let temp_array20 = [];
  let multiplyer = 0;
  if (props.temp < 20) {
    multiplyer = 3;
  } else if (props.temp < 30) {
    multiplyer = 2;
  } else {
    multiplyer = 1;
  }
  for (let index = 0; index < props.temp_array.length - 20; index++) {
    const element = props.temp_array[index];
    const temp = element.main.temp;
    temp_array20[index] = temp * multiplyer + "px";
  }

  //Realfeel temp message
  let message = "";
  if (props.feels_like < 15) {
    message = "It's too cold, Stay inside!";
  } else if (props.feels_like > 35) {
    message = "It's too hot! Stay coverd!";
  } else {
    message = "Feels good, Enjoy your day";
  }

  return (
    <div className="temp-box">
      <div className="othersBody">
        <div className="bigBox">
          {/* -----temp----- */}
          <div className="temp">
            <h3>Temperature Status</h3>
            <div className="chart">
              {temp_array20.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bar"
                    style={{ height: item }}
                  ></div>
                );
              })}
            </div>
            <div className="curentTemp">
              <div className="tempNow">
                <div className="tempValue">
                  <p>{props.temp}</p>
                  <span>℃</span>
                </div>
              </div>
              <div className="minmaxtemp">
                <p>
                  <b>Min</b> {props.min_temp} ℃
                </p>
                <p>
                  <b>Max</b> {props.max_temp} ℃
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="smallBox">
          {/* ----- Feels like ----- */}
          <div className="feelslike">
            <h3>Feels Like</h3>
            <div className="flexBox">
              <div className="box">
                <UilTemperatureQuarter className="icon" />
                <div>{Math.floor(props.feels_like)} ℃</div>
              </div>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Temp;
