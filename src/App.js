import React, {useState, useEffect} from 'react';

import HourlyData from './components/hourly/Hourlydata';
import Forecast from './components/forecastTiles/forecast'
import Today from './components/today/today'
import './App.css';




function App() {

  let f=[];
  
  /*set your api key here 
  example: 
  const API_KEY='Your_Api_Key'*/
  const API_KEY=process.env.REACT_APP_API_KEY;
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState([]);
  const [newForecast,setNewForecast] = useState([]);
  const [forecast, setForecast] = useState([]);
  //move into custom hook
  const [hover0,setHover0] = useState(Boolean);
  const [hover1,setHover1] = useState(Boolean);
  const [hover2,setHover2] = useState(Boolean);
  const [hover3,setHover3] = useState(Boolean);
  const [check, setCheck] = useState(Boolean);
  const [check2,setCheck2] = useState(Boolean)

  useEffect(()=>{getWeather();},[query]);
  useEffect(()=>{formatForecast(forecast);},[forecast]);
  useEffect(()=>{setCheck(weather.length !== 0);setCheck2(newForecast.length!==0)},[weather])
  
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
        //console.log(forecast)

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
        f.push(forecast[i-1])
        f.push(high);
        f.push(low);
        low=200;
        high=0;
        newForecast.push(f)
        f=[]  
        }
      }
      //making sure the forecast updates after change
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
    <div className="App"  >
      <div className="topHalf" >
      <h1>Weatherly</h1>
      {
        
        <form onSubmit={getSearch} className="citySelector">
          <input id="citySelector" type="text" value={search} onChange={updateSearch} ></input>
          <button type="submit" onClick={getSearch} className="searchBtn">Search </button>
        </form>
      }
      </div>
      <div id='main'>
        <div id="left-half">
          <div className="container">
            <div>
              {
                
                check &&
                <Today 
                  key={0}
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
            <div className="day" 
                  onMouseEnter={()=>{setHover0(true)}}
                  onMouseLeave={()=>{setHover0(false)}}>
              {
                
                check2&&
                <Forecast
                  className="forecast-data"
                  key={1}
                  // day={day[0]}
                  forecast={newForecast[0]}
                  overcast={newForecast[0][5].weather[0].main}
                />
              }
            </div>
            <div className="day" onClick={()=>setHover1(!hover1)}>
                  {/* // onMouseEnter={()=>{setHover1(true)}}
                  // onMouseLeave={()=>{setHover1(false)}} */}
                {
                  
                    check2&&
                      <Forecast
                      className="forecast-data"
                      key={2}
                      // day={day[1]}
                      city={weather.name}
                      forecast={newForecast[1]}
                      overcast={newForecast[1][5].weather[0].main}
                      
                    />
                }
            </div>
            <div className="day"
                  onMouseEnter={()=>{setHover2(true)}}
                  onMouseLeave={()=>{setHover2(false)}}>
                {
                    check2&&
                    <Forecast
                      className="forecast-data"
                      key={3}
                      // day={day[2]}
                      city={weather.name}
                      forecast={newForecast[2]}
                      overcast={newForecast[2][5].weather[0].main}
                    />
                }
            </div>
            <div className="day"
                  onMouseEnter={()=>{setHover3(true)}}
                  onMouseLeave={()=>{setHover3(false)}} >
                {
                    check2&&
                    <Forecast
                      className="forecast-data"
                      key={4}
                      // day={day[3]}
                      city={weather.name}
                      forecast={newForecast[3]}
                      overcast={newForecast[3][5].weather[0].main}

                    />
                }
            </div>
          </div>
          <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by vectorpocket - www.freepik.com</a>
          
        </div>
        <div id="right-half">
          <div className="hourly">
              <div >
               {hover0&&
                <HourlyData
                  key={5}
                  city={weather.name}
                  forecast={newForecast[0]}

                />
               }
              </div>
              <div >
               {hover1&&
                <HourlyData
                  key={6}
                  city={weather.name}
                  forecast={newForecast[1]}

                />
               }
              </div>
              <div >
               {hover2&&
                <HourlyData
                  key={7}
                  city={weather.name}
                  forecast={newForecast[2]}

                />
               }
              </div>
              <div >
               {hover3&&
                <HourlyData
                  key={8}
                  city={weather.name}
                  forecast={newForecast[3]}

                />
               }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
