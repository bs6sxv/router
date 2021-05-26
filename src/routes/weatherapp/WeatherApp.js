import React, { useState , useEffect, useContext} from "react";
import Weather from "./Components/Weather"
import Hourly from "./Components/Hourly"
import Weekly from "./Components/Weekly"
import { AppBar, Tab, Input, Button, IconButton, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import './weather.css';
import {CityContext} from "../contexts/cityContext"

function WeatherApp() {
  const API_KEY = process.env.REACT_APP_api_key2;
  const [weather, setWeather] = useState([]);
  const [zipCode, setZipCode] =useState(22904);
  //const [city, setCity] =useState("Charlottesville");
  const {city, setCity} = useContext(CityContext);
  const [weeklyHourly, setWeeklyHourly] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
      console.log(city)
      getWeather()
  }, [setWeather])

  const getWeather= () => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    if (city !== "") {
      url.searchParams.append("q", city);
    } else {
      url.searchParams.append("zip", zipCode);
    }
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("units", "imperial");
    console.log(url)
    fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        // also important to check html error codes
        // 200 means no errors
        if (obj.cod === 200) {
          setWeather(obj);
          getHourlyWeekly(obj.coord.lat, obj.coord.lon);
        } else {
          setWeather(false);
        }
      });   
      setCity(city);
      setValue("1");
      
  };

  const getHourlyWeekly = (lat, long) => {
    const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon", long);
    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("units", "imperial");
    console.log(url);
    fetch(url)
      .then((resp) => 
        resp.json()
      )
      .then((obj) => {
        setWeeklyHourly(obj);
        console.log(weeklyHourly)
      });
      
  };

  const handleCurrentWeather = (e) => {
    setZipCode(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };


  if (weather.length === 0){
    return (<div style={{justifyContent:"center", display:"flex"}}>
        <h2>Loading...</h2>
    </div>
    )
  }
  return (
    <div> <span ><TextField variant="filled" style={{width:300, marginLeft:470, marginTop:20, marginBottom:20}} label="Search by ZipCode" type="number" onChange={handleCurrentWeather} />
    <IconButton onClick={getWeather}>
          <SearchIcon/>
      </IconButton> 
    <TextField variant="filled" style={{width:300, marginLeft:50, marginTop:20, marginBottom:20}} type="text" label="Search by City" onChange={handleCity} ></TextField>
    <IconButton style={{marginTop:20, marginBottom:20}} onClick={getWeather}>
          <SearchIcon/>
      </IconButton></span>
    <div className="weather1-app" style={{ textAlign: "center" }}>
      
       <TabContext value={value}>
  <AppBar style={{marginTop:30}}  position="static">
    <TabList variant="fullWidth" onChange={handleChange} aria-label="simple tabs example">
      <Tab label="Current Weather" value="1" />
      <Tab label="Hourly" value="2" />
      <Tab label="Daily" value="3" />
    </TabList>
  </AppBar>
  <TabPanel value="1">
  <Weather
          weather={weather}
        /></TabPanel>
  <TabPanel value="2"> 
  <Hourly
          current={weeklyHourly}
          weather={weather}
        />
        </TabPanel>
  <TabPanel value="3">
  <Weekly
          current2={weeklyHourly}
          weather={weather}
        />
    </TabPanel>
</TabContext>

    </div>
    </div>
  );
}
export default WeatherApp;