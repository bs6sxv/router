import {useState} from "react";
import Box from '@material-ui/core/Box';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Button} from '@material-ui/core';
import { withGoogleMap,
    withScriptjs, Marker, GoogleMap, DirectionsRenderer } from 'react-google-maps'

export default function Display ({ latitude, longitude, city}) {

    const google = window.google;
    const [directions, setDirections] = useState();

const address = (address) => {
    if (address.vicinity !== undefined){
        return address.vicinity
    } else {
        return address.formatted_address
    }
}

const getDirections = () => {
    const directionsService = new google.maps.DirectionsService();

    const origin = {lat: 6.5244, lng:  3.3792 };
    const destination = { lat: 6.4667, lng:  3.4500};

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints: [
                {
                    location: new google.maps.LatLng(6.4698,  3.5852)
                },
                {
                    location: new google.maps.LatLng(6.6018,3.3515)
                }
            ]
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                console.log(result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 6.5244, lng:  3.3792 }}
            defaultZoom={13}
        >
            <DirectionsRenderer
                directions={directions}
            />
        </GoogleMap>
    ));

    return <div>
    <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
</div>
}

    return(
        <div className="display"  style={{ justifyContent:"center", alignItems: "center" }}> 
        {city.map((each)=> {
            return (
                <Box 
                display="flex" justifyContent="center" alignItems="center"
                height={180} width={650} border={1} m={2} 
                borderRadius={1} boxShadow={3} bgcolor="white">
                <ul id="listed"><li><Box><h2 >{each.name}</h2></Box></li>
                <Box >{address(each)}</Box>
                <Box m={.3}>Rating: {each.rating} </Box>
                <Box m={.3}>Price: {each.price_level}</Box>
                <Button variant="outlined" color="primary" >Get Directions <DirectionsIcon></DirectionsIcon></Button>
                </ul>
                </Box>
            );
        })}
        </div> 
    ) 
}