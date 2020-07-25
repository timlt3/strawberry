// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// //import Login from './login/login.js'

// // const routing = (
// //   <Router>
// //     <div>
// //       <Route path="/" component={App} />
// //       <Route path="/Login" component={Login} />
// //     </div>
// //   </Router>
// // )

// // ReactDOM.render(routing, document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();