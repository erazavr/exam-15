import React from 'react';
import {Route, Switch} from "react-router-dom";

import MainPage from "./containers/MainPage/MainPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import AddPlace from "./containers/AddPlace/AddPlace";
import OnePlace from "./containers/OnePlace/OnePlace";

const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact component={MainPage}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/addPlace" exact component={AddPlace}/>
      <Route path="/onePlace/:id" exact component={OnePlace}/>
      <Route render={()=> <h1>Not Found</h1>}/>
    </Switch>
  );
};

export default Routes;