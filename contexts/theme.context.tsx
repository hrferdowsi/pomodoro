
import React, { useState } from 'react';

// ّ
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

//below is my Them color context
const ThemeContext = React.createContext([{}, () => { }]); // Because I want to pass both state and setState

const ThemeProvider = (props) => {
    const [state, setState] = useState(themes.light);
    return (
        <ThemeContext.Provider value={[state, setState]}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };
