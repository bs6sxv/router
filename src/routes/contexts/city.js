import React, {useContext} from "react";
import {CityContext} from "./cityContext"

function CityDisplay(){
    const {city} = useContext(CityContext);
    return (
        <p>{city}</p>
    )
}

function CityUpdate(newCity){
    const {setCity} = useContext(CityContext);
    return (
        <p>
            {setCity(newCity)}
        </p>
    )
}

export {CityDisplay, CityUpdate};