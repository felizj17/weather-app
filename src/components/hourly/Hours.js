import React, {useEffect, useState} from 'react';

import partly_cloudy from '../images/partly_cloudy.png';
import rain from '../images/rain.png';
import clear from '../images/clear.png';
import thunderstorm from '../images/thunderstorm.png';
import './hours.css';

export default function Hours(props){    
    const [time,setTime] = useState()
    const [amPm, setAmPm] = useState()

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
    useEffect(()=>{timeFormat();},[])
    
    const timeFormat =()=>{
        setAmPm('am')
        if(props.hour[11]==0&&props.hour[12]==0){
            setTime(12);
        }
        else if(props.hour[11]==1 && props.hour[12]>2){
            setTime(props.hour[12]-2)     
            setAmPm('pm')                           
            
        }else if(props.hour[11]==1 && props.hour[12]<3){
            switch(props.hour[12]){
                case '0':setTime(10);break;
                case '1':setTime(11);break;
                case '2':setTime(12);setAmPm('pm');break;
                default:setTime(13)
            }
            
        }else if(props.hour[11]==2){
            setTime(9);
            setAmPm('pm')
        }
        else{
            setTime(props.hour[12])
        }
        
    }
    return(
        <div className="hours" >
            <div className="time">
                
                <h1>{Math.round(props.temp)}°</h1>
                <p>{time}{amPm}</p>
{                console.log(props.hours)
}                
            </div>
            <h3 id="overcast">{props.overcast}</h3>
            <div className="widget">
                <img src={widget} className="weather-model-mini" />
            </div>
        </div>
    )
}