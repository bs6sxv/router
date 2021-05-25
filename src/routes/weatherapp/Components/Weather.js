import React from "react";
import ReactAnimatedWeather from 'react-animated-weather';
import Box from '@material-ui/core/Box';
export default function Weather ({weather}) {

  const rain = {
    icon: 'RAIN',
    color: 'blue',
    size: 90,
    animate: true
  };

 const cloudy = {
    icon: 'CLOUDY',
    color: 'grey',
    size: 80,
    animate: true
  };

  const clear = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 90,
    animate: true
  };
  

const icon = (type) => {
    console.log(type)
    if (type==="Clouds"){
    return (
         <ReactAnimatedWeather
    icon={cloudy.icon}
    color={cloudy.color}
    size={cloudy.size}
    animate={cloudy.animate}
  />
      );}
      if (type==="Clear"){
        return ( 
             <ReactAnimatedWeather
        icon={clear.icon}
        color={clear.color}
        size={clear.size}
        animate={clear.animate}
      />
          );}
          if (type==="Rain"){
            return (
                 <ReactAnimatedWeather
            icon={rain.icon}
            color={rain.color}
            size={rain.size}
            animate={rain.animate}
          />)}
}

    return (
        <div><Box  border={1} style={{marginTop: 20, }}height={510} width={400} bgcolor="white" borderRadius={16} boxShadow={3} >
            <span>
            <h1 style={{marginTop:20}}> {weather.name}</h1></span>
            <h1>{weather.main.temp}°</h1>
            <h4><div><span style={{marginRight: 20, marginBottom:10}}>{weather.main.temp_min}° </span><span style={{marginLeft: 20}}>{(JSON.stringify(weather.main.temp_max, undefined, 4)).replace(/^"(.*)"$/, '$1')}°</span></div></h4>
            {icon(((weather.weather)[0]).main)}
            <h2 style={{fontSize: 27}}>{((weather.weather)[0]).main}</h2>
            <h3 style={{fontSize: 17}}>Feels Like: {weather.main.feels_like}°</h3>
            <h3 style={{fontSize: 17}}>Pressure: {weather.main.pressure}</h3>
            <h3 style={{fontSize: 17}}>Humidity: {weather.main.humidity}%</h3>
            <h3 style={{fontSize: 17}}>Wind Speed: {weather.wind.speed} mph</h3></Box>
        </div>
    );

}