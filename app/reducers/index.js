import { combineReducers } from 'redux';
import {createReduce} from './utils';
import { routerReducer as router } from 'react-router-redux';
import * as FeedbackActions from '../actions/feedback'

const feedbackExample = createReduce(FeedbackActions.EXAMPLE)

const rootReducers = combineReducers({
    feedbackExample,
    router
});

export default rootReducers;
