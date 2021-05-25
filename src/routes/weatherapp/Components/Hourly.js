import React from "react";
import Box from '@material-ui/core/Box';
import ReactAnimatedWeather from 'react-animated-weather';
import wind from './wind.png';

export default function Hourly ({current, weather}) {

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = " " + hour + ':' + min + "0";
  return time;
    }
const cloudy = {
    icon: 'CLOUDY',
    color: 'grey',
    size: 45,
    animate: true
  };



  const clear = {
    icon: 'CLEAR_DAY',
    color: 'goldenrod',
    size: 45,
    animate: true
  };



  const rain = {
    icon: 'RAIN',
    color: 'blue',
    size: 45,
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
          />
              );} 
              if (type==="Wind"){
                return (
                     <ReactAnimatedWeather
                icon={wind.icon}
                color={wind.color}
                size={wind.size}
                animate={wind.animate}
              />
                  );}      
}


const toRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(':');
    return `${(hours > 12) ? hours - 12 : hours}:${minutes} ${(hours >= 12) ? 'PM' : 'AM'}`;
}

    return (
<div>
            <h1 style={{marginTop:20}}> {weather.name}'s Hourly Weather</h1>
            <div> {current.hourly.map((cur)=> {
                return [
                    <Box 
                    display="flex" justifyContent="center" alignItems="center"
                    height={80} width={650} border={1} m={2.5}
                    borderRadius={16} boxShadow={3} bgcolor="white">
                    <Box mr={8}>{toRegularTime(timeConverter(cur.dt))}</Box>
                    <Box mr={6}><span style={{fontSize: 25, fontWeight: "bold"}}>{cur.temp}° </span></Box>
                    <Box mr={3}>{icon(cur.weather[0].main)} </Box>
                    <Box mr={7}><h3>{cur.weather[0].main}</h3></Box> 
                    <Box mr={1}><img className="photo" src={wind}  /></Box>
                    {cur.wind_speed} mph
                    </Box>
                ]
            })}
            </div> 
        </div>
    );
}