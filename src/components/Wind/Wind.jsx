import React from "react";
import "./Wind.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UilTear } from "@iconscout/react-unicons";
const Wind = (props) => {
  //wind
  const widndSpeed = props.wind_speed * 3.6;
  const wind_speed = Number(widndSpeed.toFixed(2));
  const wind_percentage = (wind_speed / 60) * 100;
  return (
    <div className="wind-box">
      <div className="othersBody">
        <div className="bigBox">
          {/* -----wind----- */}
          <div className="wind">
            <h3>Wind Speed</h3>
            <div className="windMeter">
              <CircularProgressbarWithChildren
                value={wind_percentage}
                circleRatio={0.5}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: "round",
                  pathTransitionDuration: 2,
                  pathColor: `rgb(0, 155, 252)`,
                  trailColor: "rgba(130, 130, 130, 0.346)",
                })}
                strokeWidth={8}
              >
                <div className="windSpeed" style={{ display: "flex" }}>
                  <p style={{ fontSize: 40, marginTop: 55 }}>{wind_speed} </p>
                  <span
                    style={{
                      textAlign: "center",
                      marginLeft: 10,
                      marginTop: 74,
                      fontSize: 20,
                    }}
                  >
                    km/h
                  </span>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>

        <div className="smallBox">
          {/* ----- humidity ------ */}
          <div className="humidity">
            <h3>Humidity</h3>
            <div className="flexBox">
              <div className="value">
                {props.humidity}
                <span>%</span>
              </div>
              <div className="humDescription">
                <UilTear className="UilTear" />
                <p>The drew point is 27 right now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wind;
