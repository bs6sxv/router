import './resfinder.css';
import axios from 'axios';
//import API_KEY from "./keys"
import React, { useState, useEffect, Fragment } from "react";
import Display from "./Components/Display"
import Map from "./Components/Map" 
import {Grid} from "@material-ui/core";
import NewSearch from "./Components/NewSearch"
import Bouncer from 'react-data-bouncer'

function RestaurantFinder(props,{city, changeCity}) { 
  const API_KEY = process.env.REACT_APP_api_key;
  const [places, setPlaces] = useState([]);
  const [latitude, setLatitude] = useState(38.0293);
  const [longitude, setLongitude] = useState(-78.4767);
  const [type, setType] = useState("restaurant"); 
 
  useEffect(() => {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
      url.searchParams.append("location", latitude + "," + longitude);
      url.searchParams.append("type", type);
      url.searchParams.append("rankby", "distance");
      url.searchParams.append("opennow", "true");
      url.searchParams.append("key", API_KEY);
      console.log(url);
    axios.get(url)
    .then(response => response.data)
      .then((data)=> {
        setPlaces(data.results)
        console.log(data.results)
        console.log(latitude)
      })
   
  }, [setPlaces]);


  return (
    <div className="App" style={{justifyContent:"center", alignItems: "center", textAlign: "center" }}>
{console.log(latitude)}
      <Bouncer>
       <NewSearch
       type={type}
       latitude={latitude}
      longitude={longitude}
      // changeCity={props.changeCity}
      changePlaces = {places => setPlaces(places)}
      changeLat = {latitude => setLatitude(latitude)}
      changeLon = {longitude => setLongitude(longitude)}
      changeType = {type => setType(type)}
       ></NewSearch></Bouncer>
      <Fragment>
      <Grid container>
        <Grid item sm>
        <Display 
        latitude={latitude}
        longitude={longitude}
        city={places}></Display>
        </Grid>
      <Grid item sm>
      <Map 
      latitude={latitude}
      longitude={longitude}
      places={places}></Map>
        </Grid>
      </Grid>
    </Fragment>
    </div>
  );
}

export default RestaurantFinder;