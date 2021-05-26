import React, {useState} from "react";
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import {Button} from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios';

export default function Map ({formatAddress, longitude, latitude, places}) {
const API_KEY = process.env.REACT_APP_api_key;
const [miles, setMiles] = useState("");
const ChangeCoords = ({coords}) => {
    const map = useMap();
     map.setView(coords, map.getZoom());

  return null;
}


const address = (address) => {
    if (address.vicinity !== undefined){
        return address.vicinity
    } else {
        return address.formatted_address
    } }

    const handleDirections = (secondLocation) => {
        const url = new URL("http://www.google.com/maps/dir/?api=1");
        url.searchParams.append("origin", formatAddress);
        url.searchParams.append("destination", secondLocation);
        url.searchParams.append("travelmode", "driving");
        // console.log(url);
        return url;
    }

    const getMiles = (secondLocation) => {
        let string =""
        const url = new URL("https://maps.googleapis.com/maps/api/directions/json?origin=" + formatAddress);
        //url.searchParams.append("origin", formatAddress);
        url.searchParams.append("destination", secondLocation);
        url.searchParams.append("units", "imperial");
        url.searchParams.append("key", API_KEY);
        console.log(url)
        axios.get(url)
        .then(response => response.data)
          .then((data)=> {
            //console.log(data.routes[0].legs[0].distance.text)
            setMiles(data.routes[0].legs[0].distance.text);
            console.log(miles)
            return miles;
          })
    }

    return(
        <MapContainer className="mapid" center={[latitude, longitude]} zoom={14} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <ChangeCoords coords={[latitude, longitude]}></ChangeCoords>
  {places.map(place => (
      <Marker 
      key={place.place_id}
      position={[place.geometry.location.lat, place.geometry.location.lng]}>
          <Popup >
              <div><span style={{fontSize:20, fontWeight: "bold"}}> {place.name}</span>{getMiles(address(place))}</div>
              {/* <h2 style={{display:"flex"}}><div>{place.name}</div></h2><h4>hi</h4> */}
              <div><div >{address(place)}</div>
              <div >Rating: {place.rating}</div>
              <div>Price: {place.price_level}</div></div>
              <div style={{display:"flex", justifyContent:"center"}} ><Button size="small" variant="outlined" color="primary" href={handleDirections(address(place))} target="_blank">Get Directions <DirectionsIcon></DirectionsIcon></Button></div>
          </Popup>
      </Marker>
  ))}
  
</MapContainer>
    ) 
}