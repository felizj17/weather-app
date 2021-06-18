import {useState, useEffect } from 'react';
import partly_cloudy from '../images/partly_cloudy.png';
import rain from '../images/rain.png';
import clear from '../images/clear.png';
import thunderstorm from '../images/thunderstorm.png';

import './today.css';


export default function Today(props){
    const [widget, setWidget] = useState();
    useEffect(()=>{imageSelector(props.overcast);},[props.overcast])
    const imageSelector=(overcast)=>{
        switch(overcast){
          case 'Rain': setWidget(rain);break;
          case 'Clouds':setWidget(partly_cloudy);break;
          case 'Clear':setWidget(clear);break;
          default:setWidget(thunderstorm);break;
        }
      }

    return(
        <div className="today" >
        <div className="today-wrapper">
        <h1 className="today-text">{props.city}</h1>
            <h4 className="today-text">{props.overcast}</h4>
            <div className="temp" >
                <h1 className="today-text">{Math.round(props.temp)}°</h1>
                <div className="min_max">
                    <p className="today-text" className="high-temp">{Math.round(props.max)}°</p>
                    <p className="today-text" className="low-temp">{Math.round(props.min)}°</p>
                </div>
            </div>
            <p className="today-text">Humidity:{Math.round(props.humidity)}%</p>
            <p className="today-text">Feels Like:{Math.round(props.feels)}°</p>
            <p className="today-text">Wind Speed:{Math.round(props.winds)}</p>
            <div className="widget-container">
                    <img src={widget} className="weather-model" />
            </div>
        </div>
        </div>
    );
}
