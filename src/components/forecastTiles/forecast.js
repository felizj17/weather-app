import React, {useState, useEffect} from 'react';

import partly_cloudy from '../images/partly_cloudy.png';
import rain from '../images/rain.png';
import clear from '../images/clear.png';
import thunderstorm from '../images/thunderstorm.png';

import './forecast.css';

export default function Forecast(props){
    const [widget, setWidget] = useState();
    useEffect(()=>{imageSelector(props.overcast);},[props.overcast])
    const imageSelector=(overcast)=>{
        switch(overcast){
          case 'Rain':setWidget(rain);break;
          case 'Clouds':setWidget(partly_cloudy);break;
          case 'Clear':setWidget(clear);break;
          default: setWidget(thunderstorm);break;
        }
      }
    return( 
        <div className="wrapper" >
        
        <div className="forecast-tile" >
            <div className="forecast-tile-wrapper">
                {}
                <h2>{props.forecast[0]}</h2>
                <h3>{props.overcast}</h3>
            <div className="temp">
               
                <h1>{Math.round(props.forecast[5].main.temp)}°</h1>
                <div className="min_max">
                    <h4 className="high-temp">{Math.round(props.forecast[props.forecast.length-2])}°</h4>
                    <h4 className="low-temp">{Math.round(props.forecast[props.forecast.length-1])}°</h4>
                </div>
                </div>
                <h3>Humidity: {Math.round(props.forecast[5].main.humidity)}%</h3>
                <h3>Feels Like: {Math.round(props.forecast[5].main.feels_like)}°</h3>
                <br></br>
                <div className="widget-container">
                    <img src={widget} className="weather-model" />
                </div>
            </div>
        </div>
    </div> 
    );
}