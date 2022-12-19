import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { Route, Switch, HashRouter } from "react-router-dom";
import LoginRegister from "./LoginRegister.js";
import Test from "./Test.js";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
