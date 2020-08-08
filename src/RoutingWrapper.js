import React from "react";
import App from "./App";
import "./RoutingWrapper.css";
import PrivacyPolicy from "./PrivacyPolicy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function RoutingWrapper() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
