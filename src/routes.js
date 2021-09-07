import React , {useState} from "react";
import { Switch, Route } from "react-router-dom";
import Home from './component/home.js'
const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
        </Switch>
    )
}



export default Routes;