/**
 * Created by yhon on 2017/9/9.
 */
import 'babel-polyfill';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import * as configureStore from './store/configureStore';
import {ConnectedRouter} from 'react-router-redux'
import routes from './routes';
import './asset/css/customer.css'

const store =configureStore.configureStore()

render(
    <Provider store={store}>
        <ConnectedRouter history={configureStore.history}>
            {routes}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('main')
)
