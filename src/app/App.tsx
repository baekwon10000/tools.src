import React from "react";
import ReactDOM from "react-dom";
import {Route, Router, Routes, useRouterHistory, BrowserRouter, browserHistory} from "react-router";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {createHashHistory} from "history";

import MainLayout from "./components/Layout"
import NotFoundPage from "./pages/404"
import Wrapper from "./pages/Wrapper"
import {MENUS} from "./Constants"

const globals = require("./config/" + process.env.NODE_ENV + "/globals");
const store = configureStore();
const history = useRouterHistory(createHashHistory)({queryKey: false});
const URLs = function() {
  let result = [];
  for(let i = 0; i < MENUS.length; i++) {
    for(let j = 0; j < MENUS[i].menus.length; j++) {
      result.push(MENUS[i].menus[j].link);
    }
  }
  return result;
}();

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
          /* [
            'beautify/html', 'beautify/javascript', 'beautify/css',
            'minify/html',
            'verify/json',
            'convert/color', 'convert/javaMapStr',
            'replace/html',
            'encode/url', 'encode/unicode'
          ] */URLs.map((path,index) => <Route path={path} component={Wrapper} key={index}/>)
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

