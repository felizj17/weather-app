import React, {useState, useEffect} from 'react';
import background_rain from '../images/rain.jpg';
import background_clear from '../images/clear.jpg';
import background_cloudy from '../images/cloudy.jpg';
import background_partly_cloudy from '../images/partly_cloudy.jpg';
import './forecast.css';

export default function Forecast(props){
    const [backgroundImage, setBackgroundImage] = useState();
    useEffect(()=>{imageSelector(props.overcast);},[props.overcast])
    const imageSelector=(overcast)=>{
        console.log(props.overcast)
        switch(overcast){
          case 'Rain':setBackgroundImage(background_rain);break;
          case 'Clouds':setBackgroundImage(background_cloudy);break;
          case 'Clear':setBackgroundImage(background_clear);break;
          default: setBackgroundImage(background_partly_cloudy);break;
        }
      }
    return( 
        <div className="wrapper" >
            <div className="tile" style={{background:`url(${backgroundImage})`}}>
                <h2>{props.date}</h2>
                <h3>{props.overcast}</h3>
                <div className="temp">
                    <h1>{Math.round(props.temp)}°</h1>
                    <div className="min_max">
                        <h4 className="Vtemp">{Math.round(props.max)}°</h4>
                        <h4 className="Vtemp1">{Math.round(props.min)}°</h4>
                    </div>
                </div>
                <h3>Humidity: {Math.round(props.humidity)}</h3>
                <h3>Feels Like: {Math.round(props.feels)}</h3>

            </div>
        </div>
    );
}