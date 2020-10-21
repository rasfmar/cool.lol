import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Redirect from "./pages/Redirect";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:slug([\w\-]{5})" component={Redirect} status={301} />
      <Route component={Error} status={404} />
    </Switch>
  );
};

export default App;
