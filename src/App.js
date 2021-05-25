import React, {  useState, useEffect, Fragment , Component}from "react";
import "./index.css"
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import RestaurantFinder from './routes/resfinderapp/RestaurantFinder'
import WeatherApp from './routes/weatherapp/WeatherApp'
import { DivIcon } from "leaflet";
import {Button} from '@material-ui/core';
import weatherphoto from './weatherappp.png'
import './App.css';
import restphoto from './restapp.png'

export default function App(){

  const [city, setCity] = useState("Woodbridge");

  // const handleCity = (e) => {
  //   props.changeCity(e.target.value);
  // };
  return (
    <Router>
      <main >
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/weather">Weather</Link></li>
          <li><Link to="/restaurant-finder">Restaurant Finder</Link></li>
        </ul>
      </nav> */}
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/weather"  component={()=> <Weather city={city} changeCity = {city => setCity(city)}></Weather>} />
      <Route path="/restaurant-finder"  component={() => <Restaurant  city={city} changeCity = {city => setCity(city)}></Restaurant>} />
      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
    </main>
  </Router>
    );
}
// Home Page
const Home = () => (
  <Fragment>
    <HomeText />
  </Fragment>
  );
// Weather Page
const Weather = ({city, changeCity}) => (
  // props.match.params.name
  <Fragment>
    
    <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained" ><Link to="/">Go to home page</Link></Button>
    <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:1100}} variant="contained"   > <Link to="/restaurant-finder">View Restaurants here</Link> </Button>
    <h1 style={{justifyContent: "center", alignContent: "center", display:"flex"}}>Weather App</h1>
    <WeatherApp
    city={city}
    changeCity = {changeCity}></WeatherApp>
  </Fragment>
);

// Contact Page
const Restaurant = ({city, changeCity}) => (
  <Fragment>
    <Button size="large" style={{marginTop:50, marginBottom:10, marginLeft:100}} variant="contained" ><Link to="/">Go to home page</Link></Button>
    <Button   size="large" style={{marginTop:50, marginBottom:10, marginLeft:1100}} variant="contained"   > <Link to="/weather">View Weather here</Link> </Button>
    <RestaurantFinder
    city={city}
    changeCity = {changeCity}></RestaurantFinder>
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
  