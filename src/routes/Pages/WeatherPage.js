import React, { useContext , Fragment} from "react";
import { ThemeContext } from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/ThemeContext";
import {Button} from '@material-ui/core';
import SwitchButton from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/SwitchButton"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import WeatherApp from '/Users/brittany/Desktop/Launch/router/src/routes/weatherapp/WeatherApp'
export default function Weather() {
    const {state, dispatch} = useContext(ThemeContext);
    const darkMode = state.darkMode;

    return (
    <Fragment>
      <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:400}} variant="contained" ><Link to="/">Go to home page</Link></Button>
      <SwitchButton  style={{marginTop:70, marginLeft:100}}/>
      <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/restaurant-finder">View Restaurants here</Link> </Button>
      <h1 className={darkMode ? "heading-dark" : "heading-light"} style={{justifyContent: "center", alignContent: "center", display:"flex"}}>Weather App</h1>
      <WeatherApp></WeatherApp>
    </Fragment>
  );
}