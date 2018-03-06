import fetch from 'isomorphic-fetch';
import { encode } from 'querystring';
import * as constants from '../constants/index';
import Store from '../utils/Store'

export const PAYLOAD = Symbol('API_PAYLOAD');
export const API_REQUEST_INIT = 'API_REQUEST_INIT';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const FORBIDDEN = 'FORBIDDEN';

function call(endpoint, params, options, token = null) {
    let headers = new Headers(options.headers || constants.DEFAULT_HEADERS);
    return fetch(`${endpoint}?${encode(params)}`, Object.assign({}, options, {headers}));
}

export default store => next => action => {
    const payload = action[PAYLOAD];
    if (typeof payload === 'undefined') {
        next(action);
        return;
    }
    let { endpoint, params, options, post} = payload;
    const {types, initialAction} = payload;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    params = params || {};
    options = options || {};

    if (typeof post !== 'function') {
        post = data => data;
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }

    if(types.hasOwnProperty('REQUEST') && typeof types.REQUEST !== 'string') {
        throw new Error('Expected action types has REQUEST and must be string');
    }

    if(types.hasOwnProperty('SUCCESS') && typeof types.SUCCESS !== 'string') {
        throw new Error('Expected action types has SUCCESS and must be string');
    }

    if(types.hasOwnProperty('FAILURE') && typeof types.FAILURE !== 'string') {
        throw new Error('Expected action types has FAILURE and must be string');
    }

    function actionWith(data) {
        let finalAction = Object.assign({}, action, data);
        delete finalAction[PAYLOAD];
        return finalAction;
    }
    next(actionWith(Object.assign({}, initialAction, {type: API_REQUEST_INIT})));

    const token = Store.get(AuthSettings.TOKEN_KEY || 'token');
    if (!token) {
        next(actionWith({url: endpoint, type: UNAUTHORIZED}))
    }

    return call(endpoint, params, options, token)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    next(actionWith({
                        res: post(json),
                        type: types.SUCCESS
                    }));
                });
            } else {
                res.json().then(json => {
                    switch (res.status) {
                        case 401:
                            next(actionWith({type: UNAUTHORIZED}));
                            break;
                        case 403:
                            next(actionWith({type: FORBIDDEN}));
                            break;
                        default:
                            next(actionWith({
                                error: json,
                                type: types.FAILURE
                            }));
                    }
                });
            }
        }).catch(err => next(actionWith({
            error: err,
            type: types.FAILURE
        })));
};
