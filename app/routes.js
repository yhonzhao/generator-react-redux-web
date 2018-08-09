import React from 'react';
import { Route, IndexRoute, Router } from 'react-router';
import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'

export default (
    <Router>
        <Route component={App} path='/'>
            <IndexRoute component={Home} />
            <Route component={About} path='about' />
        </Route>
    </Router>
);
