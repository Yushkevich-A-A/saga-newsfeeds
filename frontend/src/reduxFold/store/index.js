import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';
import serviceFetchPostsReducer from './../reducer/serviceFetchPostsReducer/serviceFetchPostsReducer';


const reducer = combineReducers({
    serviceFetchPosts: serviceFetchPostsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(saga);

export default store;