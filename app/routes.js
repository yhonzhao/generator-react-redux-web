import React from 'react';
import { Route } from 'react-router';
import App from './containers/App'
import Home from './containers/Home'

export default (
    <App>
        <Route exact={true} path="/" component={Home} />
    </App>
);
