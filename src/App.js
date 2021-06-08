import React, {useState, useEffect} from 'react';
import Forecast from './components/forecastTiles/forecast'
import Today from './components/today/today'
import './App.css';
import { faCouch, faHouseDamage } from '@fortawesome/free-solid-svg-icons';


function App() {
  let f=[]
  const API_KEY='';
  const [city,setCity] = useState();
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([])
  const [newForecast, setNewForecast] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('london');
  const [check, setCheck] = useState(Boolean);
 
  useEffect(()=>{getWeather();},[query]);
  
  const getWeather = async()=>{ 
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`)
      const data = await response.json();
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=imperial&appid=${API_KEY}`)
      const future = await res.json();
      if(data.cod == 200 && future.cod == 200){
        setWeather(data)
        setCity(data.name)
        setForecast(future.list)
        setCheck(weather.length !== 0)
        console.log(formatForecast(forecast))
      }
    }catch{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
      const data = await response.json();
      
    }
  }
  /**/
  const formatForecast=(forecast)=>{
   console.log('you a bitch')
   for(let i = 1;i<forecast.length+1;i++){
    if(forecast[i].dt_txt[9] == forecast[i-1].dt_txt[9]){
      f.push(forecast[i-1])
    }else{
      newForecast.push(f)
      f=[]  
      }
    }
    newForecast.push(f)
  } 

  const updateSearch = (e)=>{
    setSearch(e.target.value);
  }
 
  const getSearch =(e)=>{
    e.preventDefault();
    setQuery(search);
    setSearch('')
  }
  return (
    <div className="App">
    
      <div className="topHalf">
       {
         <form onSubmit={getSearch} className="citySelector">
          <input id="citySelector" type="text" value={search} onChange={updateSearch} ></input>
          <button type="submit" onClick={getSearch} className="searchBtn"></button>
        </form>
        
       }
        <div className="today">
          <h2>{city}</h2>
            {
              
            console.log(newForecast),
            check &&
            <Today 
              className="today-data"
              overcast={weather.weather[0].main}
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
    </div>
  );
}

export default App;
