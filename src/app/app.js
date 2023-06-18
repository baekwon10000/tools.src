import React from "react";
import ReactDOM from "react-dom";
import {Route, Router, Routes, useRouterHistory, BrowserRouter, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {createHashHistory} from "history";

import Layout from "./components/Layout"
import NotFoundPage from "./pages/404"
import Main from "./pages/Main"
import Html from "./pages/Html"
import Js from "./pages/Js"
import Json from "./pages/Json"

const globals = require("./config/" + process.env.NODE_ENV + "/globals");
const store = configureStore();
const history = useRouterHistory(createHashHistory)({queryKey: false});

window.onload = function() {}
window.onerror = function(messageOrEvent, source, lineNo, columnNo, error) {}

function handleRouterUpdate() {
  //console.log('handleRouterUpdate() is called...')
}

const Root = () => (
  <Provider store={store}>
    <Router 
      history={browserHistory}
      onUpdate={handleRouterUpdate}
    >
      <Route path="/" component={Layout}>
        <Route path="main" component={Main}/>
        <Route path="html" component={Html}/>
        {/* <Route path="js" component={Js}/> */}
        <Route path="json" component={Json}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root/>,
  document.getElementById('app')
);

