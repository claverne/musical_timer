import './App.css';
import React from 'react';
import {Home} from './Home.js'
import {Loggedin} from './Loggedin.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/loggedin'>
                    <Loggedin/>
                </Route>
                <Route path='/'>
                    <Home/>
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
