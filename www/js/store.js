import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import {ADD_POINT} from './actions/point-actions'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import tracks from './reducers/tracks'
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
  points,
  tracks
});

console.log(tracks);

const finalCreateStore = compose(
  applyMiddleware(persister, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export function createAppStore(initState) {
  return finalCreateStore(app, initState);
}
