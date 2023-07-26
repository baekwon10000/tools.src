import React from "react";
import ReactDOM from "react-dom";
import {Route, Router, Routes, useRouterHistory, BrowserRouter, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {createHashHistory} from "history";

import MainLayout from "./components/Layout"
import NotFoundPage from "./pages/404"
import Main from "./pages/Main"
import Html from "./pages/Html"
import Js from "./pages/Js"
import Json from "./pages/Json"
import Wrapper from "./pages/Wrapper"

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
      <Route path="/" component={MainLayout}>
        {
          [
            'beautify/html',
            'minify/html',
            'verify/json',
            'replace/html',
            'encode/url', 'encode/unicode'
          ].map((path,index)=><Route path={path} component={Wrapper} key={index}/>)
        }
        {/* <Route path="main" component={Main}/>
        {['html','html/beautify','html/minify'].map((path,index)=><Route path={path} component={Html} key={index}/>)}
        {['json','json/verify'].map((path,index)=><Route path={path} component={Json} key={index}/>)}
        <Route path="js" component={Js}/> */}
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root/>,
  document.getElementById('app')
);

