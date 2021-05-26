import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import {Radio, RadioGroup, FormControlLabel, FormLabel, TextField, FormControl, Select, MenuItem,InputLabel, Button, IconButton} from "@material-ui/core";
import axios from 'axios';
import { useState, useContext } from "react";
import {CityContext} from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/cityContext"
import { ThemeContext } from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/ThemeContext";
import { Renderer } from "leaflet";

export default function NewSearch (props) {
    const API_KEY = process.env.REACT_APP_api_key;
    //const [city, setCity] = useState("Charlottesville");
    const {city, setCity} = useContext(CityContext);
    const [address, setAddress] = useState("");
    //const [displayName, setDisplayName] = useState("");
    const [open, setOpen] = useState(false);
    const [displayType, setDisplayType] = useState("Restaurants");
    const [price, setPrice] = useState("1");
    const {state, dispatch} = useContext(ThemeContext);
    const darkMode = state.darkMode;

    const newSearch = () => {
      console.log(city);
        if (address !== "") {
          const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json?");
          url.searchParams.append("query", address);
          url.searchParams.append("type", props.type);
          url.searchParams.append("radius", "2500");
          url.searchParams.append("opennow", "true");
          url.searchParams.append("key", API_KEY);
          console.log(url); 
    
        axios.get(url)
        .then(response => response.data)
          .then((data)=> {
            props.changePlaces(data.results)
            console.log(data.results)
          })
    
          const url2 = new URL("https://maps.googleapis.com/maps/api/geocode/json?");
          url2.searchParams.append("address", address);
          url2.searchParams.append("key", API_KEY);
          console.log(url2); 
        axios.get(url2)
        .then(response => response.data)
          .then((data)=> {
            console.log(data.results)
            props.changeLat(data.results[0].geometry.location.lat);
            props.changeLon(data.results[0].geometry.location.lng);
            props.changeAddy(data.results[0].formatted_address)
            console.log(data.results[0].formatted_address)
          })
          
        } else {
            const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json?");
            url.searchParams.append("query", city);
            url.searchParams.append("type", props.type);
            url.searchParams.append("radius", "2500");
            url.searchParams.append("opennow", "true");
            url.searchParams.append("key", API_KEY);
        
          console.log(url); 
        axios.get(url)
        .then(response => response.data)
          .then((data)=> {
            props.changePlaces(data.results)
            console.log(data.results)
            props.changeLat(data.results[0].geometry.location.lat);
            props.changeLon(data.results[0].geometry.location.lng);
            console.log(data.results[0].geometry.location.lat)
          })
        }
          
    
          if (address !== "") {
            props.changedisName(address);
          } else {
            props.changedisName(city);
          }
    
          if (props.type === "restaurant") {
            setDisplayType("Restaurants");
          } else if (props.type === "cafe"){
            setDisplayType("Cafes");
          } else {
            setDisplayType("Bars");
          }
          // switch (type) {
          //   case "restaurant":
          //     setDisplayType("Restaurants");
          //   case "cafe":
          //     setDisplayType("Cafes");
          //   case "bar":
          //     setDisplayType("Bars");
          // }
        };
    
     
    
      const searchPrice = () => {
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
          url.searchParams.append("location", props.latitude + "," + props.longitude);
          url.searchParams.append("type", props.type);
          url.searchParams.append("rankby", "distance");
          url.searchParams.append("maxprice", price);
          url.searchParams.append("opennow", "true");
          url.searchParams.append("key", API_KEY);
          console.log(url)
          axios.get(url)
          .then(response => response.data)
            .then((data)=> {
            props.changePlaces(data.results)
              console.log(data.results)
              props.changeLat(data.results[0].geometry.location.lat);
              props.changeLon(data.results[0].geometry.location.lng);
              console.log(data.results[0].geometry.location.lat)
            })
      }
      const handleCity = (e) => {
        setAddress("");
        setCity(e.target.value);
      };
    
      const handleAddress = (e) => {
        setAddress(e.target.value);
      };
    
      const handleChange = (e) => {
        props.changeType(e.target.value);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

      const handlePrice = (e) => {
          setPrice(e.target.value)
      }


  const handleSorted = (direction) => {
  if (direction === "forward"){
    const sorted = props.places.sort((a,b) =>{
      return ( ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)))
    }) 
    console.log(sorted);
    props.changePlaces(sorted);
    console.log(props.places)
  } else {
    const sorted = props.places.sort((a,b) =>{
      return -1 * ( ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)))
  }) 
  console.log(sorted);
  props.changePlaces(sorted);
  console.log(props.places)}
  
  }

    return(
        <div >
            <div className={darkMode ? "heading-dark" : "heading-light"}>
      <TextField variant="filled" style={{marginTop:20, width:300}} type="text" label="Search by City" onChange={handleCity} ></TextField>
      <IconButton style={{marginTop:20}} onClick={newSearch}><SearchIcon/></IconButton> 
      <TextField variant="filled" style={{marginLeft:30, marginTop:20, width:300}} type="text" label="Search by Address" onChange={handleAddress} ></TextField>
      <IconButton style={{marginTop:20}} onClick={newSearch}><SearchIcon/></IconButton>    
      <h1>{displayType} Near {props.displayName}</h1></div>
      <div className={darkMode ? "heading-dark" : "heading-light"}>
      <h2><span className={darkMode ? "heading-dark" : "heading-light"}>Fliter by: 

      <FormControl  style={{width:130, marginRight:10, marginLeft:30}}>
        <InputLabel >Type</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          value={props.type}
          onOpen={handleOpen}
          onChange={handleChange}
        >
          <MenuItem value={"restaurant"}>Restaurants</MenuItem>
          <MenuItem value={"bar"}>Bars</MenuItem>
          <MenuItem value={"cafe"}>Cafes</MenuItem>
        </Select>
      </FormControl>
        <Button style={{marginRight: 1050}} variant="contained" color="primary" onClick={newSearch}>Go!</Button></span>
        <span>
        <div style={{marginLeft: 1000}} >
      <FormLabel component="legend">Maximum Price</FormLabel>
      <RadioGroup value={price} onChange={handlePrice}>
        <div> Sort by:<FormControlLabel style={{marginLeft: 10}} value="1" control={<Radio />} label="1" /> 
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <Button style={{marginRight: 2}} variant="contained" color="primary" onClick={searchPrice}>Go!</Button></div>
      </RadioGroup>
      <Button variant="contained" color="primary"  onClick={handleSorted("forward")}>Names (A to Z)</Button>
      <Button variant="contained" color="primary"  onClick={handleSorted("backwards")}>Names (Z to A)</Button>
      {/* <Button variant="contained" color="primary"  onClick={()=>sorted2}>Names (Z to A)</Button> */}
      </div></span></h2></div>

        </div>
    ) 
}