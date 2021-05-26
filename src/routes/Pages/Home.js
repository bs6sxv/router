import React, { useContext , useState} from "react";
import { ThemeContext } from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/ThemeContext";
import {Button} from '@material-ui/core';
import SwitchButton from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/SwitchButton"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import weatherphoto from '/Users/brittany/Desktop/Launch/router/src/weatherappp.png'
import restphoto from '/Users/brittany/Desktop/Launch/router/src/restapp.png'
import darkweather from '/Users/brittany/Desktop/Launch/router/src/darkmodeweather.png'
import darkrest from '/Users/brittany/Desktop/Launch/router/src/darkmoderes.png'

export default function Home(){

const {state, dispatch} = useContext(ThemeContext);
const darkMode = state.darkMode;
    return (
        <div >
      {console.log(darkMode)}
      <div className={darkMode ? "heading-dark" : "heading-light"}><div style={{textAlign:"center"}}><h1>Welcome! </h1></div>
      <div style={{textAlign:"center",   marginBottom:70}}><h2>There are two applications to choose from!</h2></div></div>
      <div style={{textAlign:"center"}}>
            <Button  style={{marginTop:20, marginRight:400, marginBottom:70}} variant="contained" size="large"><Link to="/weather">Weather App</Link></Button> 
            <SwitchButton />
            <Button style={{marginTop:20, marginBottom:70 }} variant="contained" size="large"><Link to="/restaurant-finder">Restaurant Finder</Link></Button>
            <div><img className="photo2" src={darkMode ? darkweather : weatherphoto}  /><img className="photo3" src={darkMode ? darkrest :restphoto}  /></div> 
          </div>
    </div>
    )
}