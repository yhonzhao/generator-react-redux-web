import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import api from '../middleware/api';
import rootReducer from '../reducers';
import {BASENAME} from '../constants/index'

const middlewares = [];
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}

export const history = createHistory({
    basename: BASENAME
})

const middleware = routerMiddleware(history)
middlewares.push(middleware)

const finalCreateStore = compose(
    applyMiddleware(thunk,api),
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
