
import Box from '@material-ui/core/Box';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Button} from '@material-ui/core';
import { ThemeContext } from "/Users/brittany/Desktop/Launch/router/src/routes/contexts/ThemeContext";
import { useContext } from "react";

export default function Display ({formatAddress, latitude, longitude, city}) {
    const {state} = useContext(ThemeContext);
    const darkMode = state.darkMode;

const address = (address) => {
    if (address.vicinity !== undefined){
        return address.vicinity
    } else {
        return address.formatted_address
    }
}

const handleDirections = (secondLocation) => {
    const url = new URL("http://www.google.com/maps/dir/?api=1");
    url.searchParams.append("origin", formatAddress);
    url.searchParams.append("destination", secondLocation);
    url.searchParams.append("travelmode", "driving");
    console.log(url);
    return url;
}


    return(
        <div className="display"  style={{ justifyContent:"center", alignItems: "center" }}> 
        {city.map((each)=> {
            return (
                <Box 
                display="flex" justifyContent="center" alignItems="center"
                height={180} width={650} border={1} m={2} 
                borderRadius={1} boxShadow={3} 
                bgcolor={darkMode ? "#b3cbf" : "white"}>
                <ul id="listed"><li><Box><h2 >{each.name}</h2></Box></li>
                <Box >{address(each)}</Box>
                <Box m={.3}>Rating: {each.rating} </Box>
                <Box m={.3}>Price: {each.price_level}</Box>
                <Button variant="outlined" color="blueGrey" href={handleDirections(address(each))} target="_blank" >Get Directions <DirectionsIcon></DirectionsIcon></Button>
                </ul>
                </Box>
            );
        })}
        </div> 
    ) 
}