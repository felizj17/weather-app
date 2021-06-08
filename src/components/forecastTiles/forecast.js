import React from 'react';
import './forecast.css';

export default function Forecast(props){
    return( 
        <div className="wrapper">
           
            <div className="tile">
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}