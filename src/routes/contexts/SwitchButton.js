
import React, { useContext , useState} from "react";
import { ThemeContext } from "./ThemeContext";
import {Button} from '@material-ui/core';
import "/Users/brittany/Desktop/Launch/router/src/App.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, blueGrey } from '@material-ui/core/colors';

export default function SwitchButton() {
    const [color, setColor] = useState('default');
    const {state, dispatch} = useContext(ThemeContext);
    const darkMode = state.darkMode;


    const onClick = () => {

      if (darkMode) {
        dispatch({ type: "LIGHTMODE" });
        setColor('default');
      } else {
        dispatch({ type: "DARKMODE" });
        setColor('light')
      }
    };

    const theme = React.useMemo(() => {
        if (color === 'light') {
          return createMuiTheme({
            palette: {
              primary: {
                main: blue[100],
                contrastText: '#000',
              },
            },
          });
        } else {
            return createMuiTheme({
                palette: {
                  primary: {
                    main: blueGrey[900],
                    contrastText: '#fff',
                  },
                },
              });
        }
        return createMuiTheme();
      }, [color]);

    return (
    <ThemeProvider theme={theme}>
    <Button 
    style={{marginTop:20, marginRight:400, marginBottom:70}} 
    variant="contained" 
    size="large" 
    color="primary"
    //className={`btn ${darkMode ? "btn-dark" : "btn-light"}`} 
    onClick={onClick}>
    {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
    </ThemeProvider>
    )
}