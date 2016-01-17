import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import {ADD_POINT} from './actions/point-actions'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import {db, init} from './db'

const app = combineReducers({
  marker,
  points
});

const persister = store => next => action => {
  switch(action.type) {
    case ADD_POINT:
      db.post(action.point).then(response => {
        console.log('new point posted:');
        console.log(response);
        action.point = Object.assign({}, action.point, {
          _id: response.id,
          _rev: response.rev
        });
      }).catch(err => {
        console.log(err);
      }).then(() => {
        next(action);
      });
      break;
    default:
      next(action);
  }
};

const finalCreateStore = compose(
  applyMiddleware(persister),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
export const store = finalCreateStore(app);

// const remoteDb = new PouchDB('http://52.21.125.160:5984/points');

// const rep = PouchDB.replicate(remoteDb, localDb).on('complete', info => {
//
// });
