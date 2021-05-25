import React from "react";
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import ReactAnimatedWeather from 'react-animated-weather';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import wind from './wind.png';
import sunrise from './sunrisee.png'; 
import sunset from './sunset.png'; 


export default function Hourly ({current2, weather}) {

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
var months = ['Jan','Feb','Mar','April','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + ' ' + date  ;
  return time;
    }

    const timeConverter2 = (UNIX_timestamp) => {
      var a = new Date(UNIX_timestamp * 1000);
var hour = a.getHours();
var min = a.getMinutes();
var time = " " + hour + ':' + min;
return time;
  }

  const timeConverter3 = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
var hour = a.getHours();
var min = a.getMinutes();
var time = " " + hour + ':' + min +"0";
return time;
}
  const toRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(':');
    return `${(hours > 12) ? hours - 12 : hours}:${minutes} ${(hours >= 12) ? 'PM' : 'AM'}`;
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
    }
    

    return (
<div>
<h1 style={{marginTop:20}}> {weather.name}'s Daily Weather</h1>
            <div> {current2.daily.map((cur)=> {
                return [
                  <Accordion style={{backgroundColor: "transparent"}}>
                    <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        > <Typography>
                    <Box m={1} display="flex" justifyContent="center" alignItems="center"
                    height={80} width={650} border={1}
                    borderRadius={16} boxShadow={2} bgcolor="white">
                    <Box mr={8}><h4>{timeConverter(cur.dt)}</h4></Box>
                    {/* {cur.temp}° */}
                    <Box mr={5}><span style={{fontSize: 25, fontWeight: "bold"}}> {cur.temp.day}°</span>/ {cur.temp.min}°</Box>
                    <Box mr={2}>{icon(cur.weather[0].main)} </Box>
                    <Box mr={5}><h3>{cur.weather[0].main}</h3></Box>
                    <Box mr={1}><img className="photo" src={wind}  /></Box>
                    {cur.wind_speed} mph
                    </Box> 
                    </Typography></AccordionSummary>
                    <AccordionDetails>
          <Typography>
          <Box height={5} display="flex" justifyContent="center" alignItems="center">
          <Box ml={6} mr={5} style={{fontSize: 17}}><h4><img className="photo" src={sunrise}  /> Sunrise: {toRegularTime(timeConverter2(cur.sunrise))}</h4></Box>
          <Box mr={5} style={{fontSize: 17}}><h4> <img className="photo" src={sunset}  /> Sunset: {toRegularTime(timeConverter3(cur.sunset))}</h4></Box>
        
          </Box >
          <Box display="flex" justifyContent="center" alignItems="center">
          <Box ml={6} mr={5} style={{fontSize: 17}}><h4>Pressure: {cur.pressure}</h4></Box>
          <Box mr={5} style={{fontSize: 17}}><h4>Humidity: {cur.humidity}%</h4></Box>
          <Box mr={5} style={{fontSize: 17}}><h4>Day: {cur.feels_like.day}°F</h4></Box>
          <Box mr={5} style={{fontSize: 17}}><h4>Night: {cur.feels_like.night}°F</h4></Box>
          </Box>
          </Typography>
        </AccordionDetails>
                    
                    </Accordion>
                ]
            })}
            </div> 
        </div>
    );
}