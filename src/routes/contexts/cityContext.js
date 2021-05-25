import React, {useState, createContext} from "react";

const CityContext = createContext();

export default function CityProvider({children}) {
    const [city, setCity] = useState("Woodbridge");

    // const changeCityy = (newCity) ={
    //     setCity(newCity);
    
    return (
        <CityContext.Provider value={{city, setCity}}>
            {children}
        </CityContext.Provider>
    )
}
export {CityContext};