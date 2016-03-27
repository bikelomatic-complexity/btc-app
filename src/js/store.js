/*global process*/
/*esfmt-ignore-start*/
import notifications from './reducers/notifications';
import points        from './reducers/points';
import tracks        from './reducers/tracks';
import settings      from './reducers/settings';
import network       from './reducers/network';
import map           from './reducers/map';
import filters       from './reducers/filter';
import account       from './reducers/account';
import drawer        from './reducers/drawer';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;

const args = [ applyMiddleware( thunk ) ];
if ( process.env.NODE_ENV === 'development' ) {
  args.push( devTools );
}

export default compose.apply( null, args )( createStore )( combineReducers( {
  notifications,
  points,
  tracks,
  settings,
  network,
  map,
  filters,
  account,
  drawer
} ) );
/*esfmt-ignore-end*/
