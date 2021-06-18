import React,{useState,useEffect} from 'react';
import Hours from './Hours';
export default function HourlyData(props){
    const [length,setLength] = useState();
    useState(()=>{setLength(props.forecast.length);},[props.forecast])
    return(
    <div className='hourly-data'>
        <div className="title">
            <h2>{props.city}</h2>
            <h3> {props.forecast[0]} </h3>
        </div>
    <div>
        {
            
        }
            { props.forecast.map((hours,i)=>(
                i>0 && i<length-2?
                <Hours
                    key={i+7}
                    hours={hours}
                    hour={hours.dt_txt}
                    temp={hours.main.temp}
                    max={hours.main.temp_max}
                    min={hours.main.temp_min}
                    humidity={hours.main.humidity}
                    overcast={hours.weather[0].main}
                />:null
                
            )) 
        }
    </div>
    </div>
        )
}
   

    
    