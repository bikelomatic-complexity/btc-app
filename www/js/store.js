import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import {ADD_POINT} from './actions/point-actions'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import {db, init} from './db'


const persister = store => next => action => {
  switch(action.type) {
    case ADD_POINT:
      db.post(action.point).then(response => {
        action.point = Object.assign({}, action.point, {
          _id: response.id,
          _rev: response.rev
        });
      }).catch(err => {
        console.error(err);
      }).then(() => {
        next(action);
      });
      break;
    default:
      next(action);
  }
};

const app = combineReducers({
  marker,
  points
});

const finalCreateStore = compose(
  applyMiddleware(persister),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export function createAppStore(initState) {
  return finalCreateStore(app, initState);
}

// const remoteDb = new PouchDB('http://52.21.125.160:5984/points');

// const rep = PouchDB.replicate(remoteDb, localDb).on('complete', info => {
//
// });
