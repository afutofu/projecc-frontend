import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Join from "./components/Join";
import Main from "./components/Main";
import store from "./config/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/projects" exact component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
