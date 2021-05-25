import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import {Radio, RadioGroup, FormControlLabel, FormLabel, TextField, FormControl, Select, MenuItem,InputLabel, Button, IconButton} from "@material-ui/core";
import axios from 'axios';
import { useState } from "react";


export default function NewSearch (props) {
    const API_KEY = process.env.REACT_APP_api_key;
    const [city, setCity] = useState("Charlottesville");
    const [address, setAddress] = useState("");
    const [displayName, setDisplayName] = useState("Charlottesville");
    const [open, setOpen] = useState(false);
    const [displayType, setDisplayType] = useState("Restaurants");
    const [price, setPrice] = useState("1");

    const newSearch = () => {

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
            console.log(data.results[0].geometry.location.lat)
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
            setDisplayName(address);
          } else {
            setDisplayName(city);
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
    return(
        <div>
            <div>
      <TextField variant="filled" style={{marginTop:20, width:300}} type="text" label="Search by City" onChange={handleCity} ></TextField>
      <IconButton style={{marginTop:20}} onClick={newSearch}><SearchIcon/></IconButton> 
      <TextField variant="filled" style={{marginLeft:30, marginTop:20, width:300}} type="text" label="Search by Address" onChange={handleAddress} ></TextField>
      <IconButton style={{marginTop:20}} onClick={newSearch}><SearchIcon/></IconButton>    
      <h1>{displayType} Near {displayName}</h1></div>
      <h2><span>Fliter by: 

      <FormControl className="form" style={{width:130, marginRight:10, marginLeft:30}}>
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
      </div></span></h2>

        </div>
    ) 
}