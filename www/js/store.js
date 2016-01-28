
import { union } from 'underscore'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

<<<<<<< HEAD
import {ADD_POINT} from './actions/point-actions';
import {marker} from './reducers/marker';
import {points} from './reducers/points';
import tracks from './reducers/tracks';
import settings from './reducers/settings';
import { mapState } from './reducers/map';
import { filters } from './reducers/filter';
import {db, init} from './db'
=======
import reducers from './reducers'
>>>>>>> master

const reqMiddleware = [ thunk ];

const devTools = window.devToolsExtension ? window.devToolsExtension : f => f;

export default class StoreBuilder {

  constructor(extMiddleware) {
    const allMiddleware = union(extMiddleware, reqMiddleware);

<<<<<<< HEAD
const app = combineReducers({
  marker,
  points,
  tracks,
  settings,
  mapState,
  filters
});
=======
    this.createStore = compose(applyMiddleware(...allMiddleware), devTools)(createStore);
  }
>>>>>>> master

  build(initState = {}) {
    return this.createStore(reducers, initState);
  }

}
