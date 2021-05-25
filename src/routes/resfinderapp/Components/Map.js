import React from "react";
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';

export default function Map ({longitude, latitude, places}) {
 
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
          <Popup>
              <h2>{place.name}</h2>
              <div>{address(place)}</div>
              <div>Rating: {place.rating}</div>
              <div>Price: {place.price_level}</div>
          </Popup>
      </Marker>
  ))}
  
</MapContainer>
    ) 
}