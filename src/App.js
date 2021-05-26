import React, {Fragment, useContext }from "react";
import "./index.css"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RestaurantFinder from './routes/resfinderapp/RestaurantFinder'
import WeatherApp from './routes/weatherapp/WeatherApp'
import {Button} from '@material-ui/core';
import weatherphoto from './weatherappp.png'
import './App.css';
import restphoto from './restapp.png'
import CityProvider from "./routes/contexts/cityContext"
import {ThemeContext} from "./routes/contexts/ThemeContext"
import SwitchButton from "./routes/contexts/SwitchButton";
import HomeText from "./routes/Pages/Home"
import WeatherPage from "./routes/Pages/WeatherPage"

export default function App(){

  const {state, dispatch} = useContext(ThemeContext);
  const darkMode = state.darkMode;

  return (
    <div className={darkMode ? "bg-dark" : "bg-light"}>
    <CityProvider>
    <Router>
      <main >
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/weather"  component={WeatherPage}/>
      <Route path="/restaurant-finder"  component={Restaurant} />
      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
    </main>
  </Router>
  </CityProvider>
  </div>
    );
}
// Home Page
const Home = () => (
  <Fragment>
    <HomeText />
  </Fragment>
  );


// Restaurant Page
const Restaurant = () => (
  <Fragment>
    <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100, marginRight:450}} variant="contained" ><Link to="/">Go to home page</Link></Button>
    <SwitchButton  style={{marginTop:70, marginLeft:100}}/>
    <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained"   > <Link to="/weather">View Weather here</Link> </Button>
    <RestaurantFinder></RestaurantFinder>
  </Fragment>
  );

