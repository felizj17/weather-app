import React, {useState, useEffect} from 'react';

import Forecast from './components/forecastTiles/forecast'
import Today from './components/today/today'
import './App.css';
import { auto } from 'async';

function App() {

  let f=[];
  /*set your api key here 
  example: 
  const API_KEY='ebwoueueboqbeo'*/
  const API_KEY='';
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState([]);
  const [newForecast,setNewForecast] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [check, setCheck] = useState(Boolean);
  const [check2,setCheck2] = useState(Boolean)

  useEffect(()=>{getWeather();},[query]);
  useEffect(()=>{setNewForecast(forecast);},[newForecast]);
  
  const getWeather = async() =>{ 
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`)
      const data = await response.json();
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=imperial&appid=${API_KEY}`)
      const future = await res.json();
      if(data.cod == 200){
        setWeather(data)
        setCheck(weather.length !== 0)
        setForecast(future.list)
        formatForecast(forecast);
        setCheck2(newForecast.length!==0)
      }
    }catch{
      alert('please wait source not loading');
    }
  };

  
const formatForecast=(forecast)=>{
  let high=0;
  let low=200;
  for(let i = 1;i<forecast.length;i++){
    if(forecast[i].dt_txt[9] == forecast[i-1].dt_txt[9]){
      if(newForecast.length > 4){
        newForecast.shift();
      }
      if(f.length == 0 ){
        let day = new Date(forecast[i].dt_txt).toString()[0]+new Date(forecast[i].dt_txt).toString()[1]
        switch(day){
          case 'Su': f.push('Sunday');break;
          case 'Mo': f.push('Monday');break;
          case 'Tu': f.push('Tuesday');break;
          case 'We': f.push('Wednesday');break;
          case 'Th': f.push('Thursday');break;
          case 'Fr': f.push('Friday');break;
          case 'Sa': f.push('Saturday');break;
        }
      }
      if(forecast[i].main.temp_max>high){high=forecast[i].main.temp_max}
      if(forecast[i].main.temp_min<low){low=forecast[i].main.temp_min}
      f.push(forecast[i-1]);
    }else{
    
      f.push(high);
      f.push(low);
      low=200;
      high=0;
      newForecast.push(f)
      f=[]  
      }
    }
    setCheck2(!check2)
  } 

  const updateSearch = (e)=>{
    setSearch(e.target.value);
  }
 
  const getSearch =(e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
    
  }
  return (
    <div className="App" >
      <div className="topHalf" >
      <h1>Weatherly</h1>
      {
        
        <form onSubmit={getSearch} className="citySelector">
          <input id="citySelector" type="text" value={search} onChange={updateSearch} ></input>
          <button type="submit" onClick={getSearch} className="searchBtn">Search </button>
        </form>
      }
      </div>
      <div className="container">
        <div className="today" >
          {
            check &&
            <Today 
              className="today-data"
              overcast={weather.weather[0].main}
              city={weather.name}
              temp={weather.main.temp}
              min={weather.main.temp_min}
              max={weather.main.temp_max}
              humidity={weather.main.humidity}
              feels={weather.main.feels_like}
              winds={weather.wind.speed}
            />
          }
        </div>
      </div>
      <div className="forecast">
            {
              console.log(newForecast),
              check2&&
              newForecast.map((newForecast)=>(
                
                <Forecast
                  className="forecast-data"
                  key={Math.random()}
                  date={newForecast[0]}
                  overcast={newForecast[1].weather[0].main}
                  temp={newForecast[4].main.temp}
                  min={newForecast[newForecast.length-1]}
                  max={newForecast[newForecast.length-2]}
                  humidity={newForecast[1].main.humidity}
                  feels={newForecast[1].main.feels_like}
                  winds={newForecast[1].wind.speed}  
                />))
            }  
          </div>
        </div>
  );
}

export default App;
