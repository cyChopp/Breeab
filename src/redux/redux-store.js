import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import homeReducer from './home-reducer';
import authentication from './authentication'
import profileReducer from './profile-reducer';
import postReducer from './post-reducer';


let reducers = combineReducers({
    home:homeReducer,
    auth:authentication,
    profile:profileReducer,
    post:postReducer

});

const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));

window.__store= store

export default store;