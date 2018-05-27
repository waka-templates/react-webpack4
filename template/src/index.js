/**
 * Created by pomy on 07/02/2017.
 */

'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { hot } from 'react-hot-loader';
import Info from './components/info';
import App from './app';
let app = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/info" component={Info} />
        </Switch>
    </Router>
);
window.onload = function() {
    ReactDOM.render(app, document.getElementById('wrap_container'));
};
export default hot(module)(App);
console.log('--->');
