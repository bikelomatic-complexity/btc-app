import { createStore, applyMiddleware, combineReducers } from 'redux'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import PouchDB from 'pouchdb'

const app = combineReducers({
  marker,
  points
});

const db = new PouchDB('points');

export const store = createStore(app);

// const remoteDb = new PouchDB('http://52.21.125.160:5984/points');

// const rep = PouchDB.replicate(remoteDb, localDb).on('complete', info => {
//
// });
