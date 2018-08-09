import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const middlewares = [];
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

const history = routerMiddleware(browserHistory)

const finalCreateStore = compose(
    applyMiddleware(thunk,api,history),
    applyMiddleware(...middlewares),
)(createStore);

export function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
