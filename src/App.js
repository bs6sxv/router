import React, {Fragment }from "react";
import "./index.css"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RestaurantFinder from './routes/resfinderapp/RestaurantFinder'
import WeatherApp from './routes/weatherapp/WeatherApp'
import {Button} from '@material-ui/core';
import weatherphoto from './weatherappp.png'
import './App.css';
import restphoto from './restapp.png'
import CityProvider from "./routes/contexts/cityContext"

export default function App(){

  return (
    <CityProvider>
    <Router>
      <main >
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/weather"  component={Weather}/>
      <Route path="/restaurant-finder"  component={Restaurant} />
      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
    </main>
  </Router>
  </CityProvider>
    );
}
// Home Page
const Home = () => (
  <Fragment>
    <HomeText />
  </Fragment>
  );
// Weather Page
const Weather = () => (
  <Fragment>
    <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained" ><Link to="/">Go to home page</Link></Button>
    <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:1100}} variant="contained"   > <Link to="/restaurant-finder">View Restaurants here</Link> </Button>
    <h1 style={{justifyContent: "center", alignContent: "center", display:"flex"}}>Weather App</h1>
    <WeatherApp></WeatherApp>
  </Fragment>
);

// Restaurant Page
const Restaurant = () => (
  <Fragment>
    <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained" ><Link to="/">Go to home page</Link></Button>
    <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:1100}} variant="contained"   > <Link to="/weather">View Weather here</Link> </Button>
    <RestaurantFinder></RestaurantFinder>
  </Fragment>
  );

const HomeText = () => (
  <div >
    <div style={{textAlign:"center"}}><h1>Welcome! </h1></div>
    <div style={{textAlign:"center",   marginBottom:70}}><h2>There are two applications to choose from!</h2></div>
    <div style={{textAlign:"center"}}>
          <Button  style={{marginTop:20, marginRight:800, marginBottom:70}} variant="contained" size="large"><Link to="/weather">Weather App</Link></Button> 
          <Button style={{marginTop:20, marginBottom:70 }} variant="contained" size="large"><Link to="/restaurant-finder">Restaurant Finder</Link></Button>
          <div><img className="photo2" src={weatherphoto}  /><img className="photo3" src={restphoto}  /></div> 
        </div>
  </div>
  )
  