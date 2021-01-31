import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import myTheme from "./styles/theme"

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={myTheme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
