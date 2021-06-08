import React from 'react';

export default function Today(props){
    return(
        <div className="today">
            <h4>{props.overcast}</h4>
            <div className="temp">
                <h1>{props.temp}°</h1>
                <h4 className="Vtemp">{props.max}°</h4>
                <h4 className="Vtemp">{props.min}°</h4>
            </div>
            <h3>Humidity:{props.humidity}%</h3>
            <h3>Feels Like:{props.feels}°</h3>
            <h2>Wind Speed:{props.winds}</h2>
        </div>
    );
}
