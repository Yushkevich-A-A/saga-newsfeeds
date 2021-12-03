import { take, put, spawn, call, fork } from 'redux-saga/effects';
import { serviceFetchError, serviceFetchSuccess } from '../action/actionCreators';
import { fetchListInit, fetchPreviousPosts } from '../api';

// get init posts

function* handleFetchRequest(action) {
    try {
        let data = action.payload ? yield call(fetchPreviousPosts, action.payload.id) : yield call(fetchListInit);
        yield put(serviceFetchSuccess(data));
    } catch (e) {
        yield put(serviceFetchError(e.message));
    }
}

function* watchInitFetchRequest() {
    while(true) {
        const action = yield take('INIT_FETCH_REQUEST');
        yield fork(handleFetchRequest, action);
    }
    
}

// get previous posts

function* watchFetchRequest() {
    while(true) {
        const action = yield take('FETCH_REQUEST');
        yield fork(handleFetchRequest, action);
    }
}

export default function* saga() {
    yield spawn(watchInitFetchRequest);
    yield spawn(watchFetchRequest)
}