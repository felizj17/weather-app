import React, {useState, useEffect } from 'react';
import background_rain from '../images/rain.jpg';
import background_clear from '../images/clear.jpg';
import background_cloudy from '../images/cloudy.jpg';
import background_partly_cloudy from '../images/partly_cloudy.jpg';
import './today.css';


export default function Today(props){
    const [backgroundImage, setBackgroundImage] = useState();
    useEffect(()=>{imageSelector(props.overcast);},[props.overcast])
    const imageSelector=(overcast)=>{
        switch(overcast){
          case 'Rain':setBackgroundImage(background_rain);break;
          case 'Clouds':setBackgroundImage(background_cloudy);break;
          case 'Clear':setBackgroundImage(background_clear);break;
          default: setBackgroundImage(background_partly_cloudy);break;
        }
      }

    return(
        <div className="today" style={{background:`url(${backgroundImage})`, border: `blue solid 2px`,borderRadius:`5px`}}>
        <h1 className="today-text">{props.city}</h1>
            <h4 className="today-text">{props.overcast}</h4>
            <div className="temp" >
                <h1 className="today-text">{Math.round(props.temp)}°</h1>
                <div className="min_max">
                    <p className="today-text" className="Vtemp">{Math.round(props.max)}°</p>
                    <p className="today-text" className="Vtemp1">{Math.round(props.min)}°</p>
                </div>
            </div>
            <p className="today-text">Humidity:{Math.round(props.humidity)}%</p>
            <p className="today-text">Feels Like:{Math.round(props.feels)}°</p>
            <p className="today-text">Wind Speed:{Math.round(props.winds)}</p>
        </div>
    );
}
