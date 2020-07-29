import React, { Component } from "react";
import StrawberryManager from "./contracts/StrawberryManager.json";
import Strawberry from "./contracts/Strawberry.json";
import getWeb3 from "./getWeb3";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import FoodiesApp from "./components/FoodiesApp";
import { Package } from "./components/Package";
import { Deliver } from "./components/Deliver";
import { ChangeStatusWarning } from "./components/ChangeStatusWarning";
import { ChangeStatusUnfit } from "./components/ChangeStatusUnfit";
import { ChangeStatusGood } from "./components/ChangeStatusGood";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import SignInScreen from "./firebase-init";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/signedIn">
                            <FoodiesApp />
                        </Route>
                        <Route path="/">
                            <SignInScreen />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
