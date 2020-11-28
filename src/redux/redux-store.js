import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import homeReducer from './home-reducer';


let reducers = combineReducers({
    home:homeReducer

});

let store = createStore(reducers,applyMiddleware(thunk));

window.store= store

export default store;