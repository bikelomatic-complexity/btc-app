import { Agent, observeStore } from '../util/agent';
import { local, remote, reset } from '../database';
import { setSnackbar } from './notifications/snackbar';

import { Point, PointCollection } from 'btc-models';
import { assign, merge, omit, bindAll } from 'lodash';

export const ADD_SERVICE = 'btc-app/points/ADD_SERVICE';
export const ADD_ALERT = 'btc-app/points/ADD_ALERT';
export const UPDATE_SERVICE = 'btc-app/points/UPDATE_SERVICE';
export const RESCIND_POINT = 'btc-app/points/RESCIND_POINT';
export const RELOAD_POINTS = 'btc-app/points/RELOAD_POINTS';
export const REQUEST_LOAD_POINT = 'btc-app/points/REQUEST_LOAD_POINT';
export const RECEIVE_LOAD_POINT = 'btc-app/points/RECEIVE_LOAD_POINT';
export const REQUEST_REPLICATION = 'btc-app/points/REQUEST_REPLICATION';
export const RECEIVE_REPLICATION = 'btc-app/points/RECEIVE_REPLICATION';
export const RESET_POINTS = 'btc-app/points/RESET_POINTS';

export default function reducer( state = {}, action ) {
  switch ( action.type ) {
  case UPDATE_SERVICE:
  case ADD_SERVICE:
  case ADD_ALERT:
    return merge( {}, state, {
      points: { [ action.id ]: action.point }
    } );
  case RESCIND_POINT:
    return assign( {}, state, {
      points: omit( state, action.id )
    } );
  case RELOAD_POINTS:
    return assign( {}, state, {
      points: action.points
    } );
  case RESET_POINTS:
    return assign( {}, state, { points: {} } );
  case REQUEST_LOAD_POINT:
    return merge( {}, state, {
      points: {
        [ action.id ]: { isFetching: true }
      }
    } );
  case RECEIVE_LOAD_POINT:
    return merge( {}, state, {
      points: {
        [ action.id ]: { isFetching: false, ...action.point }
      }
    } );
  case REQUEST_REPLICATION:
    return assign( {}, state, {
      replication: { time: action.time, inProgress: true }
    } );
  case RECEIVE_REPLICATION:
    return assign( {}, state, {
      replication: { time: action.time, inProgress: false }
    } );
  default:
    return state;
  }
}

// # Generic Add & Update Logic
//
// This function makes an action creator suitable for adding and updating
// alerts and services.
//
// The returned action creator function takes two arguments:
//
//  1. point -- the alert or service model instance to save, from btc-models
//  2. coverBlob -- an optional image to attach to the point
//
// Action creators (that do not utilize redux-thunk) must return an action.
// When the user adds an alert or service, this should be done synchronously,
// without delay. We must also persist the change to the database. The flow
// goes as follows:
//
//  - Check if the point is valid. If not, do not dispatch anything
//  - Specify the point's id, based on name, location, and type.
//  - Generate a promise that persists the point to the database
//    * If we are creating a new point, just use save.
//    * If we are updating a point, re-fetch it before saving because we need
//      to obtain the latest `_rev`
//  - If the user has supplied an image blob, extend the promise to attach
//    the blob after saving is complete. Also, make the blob synchronously
//    available to the point (so `point.store` works below)
//  - Return an action containing the rexux-representation of the point. This
//    will return before the promises resolve.
const factory = type => {
  return ( point, coverBlob ) => {
    if ( !point.isValid() ) {
      console.error( 'the submitted point was not valid!' );
    } else {
      point.specify();

      let promise;
      if ( type === UPDATE_SERVICE ) {
        const attributes = point.attributes;
        promise = point.fetch().then( res => point.save( attributes ) );
      } else {
        promise = point.save();
      }

      if ( coverBlob ) {
        point.setCover( coverBlob );
        promise.then(
          ( ) => point.attach( coverBlob, 'cover.png', 'image/png' )
        );
      }
      return { type, id: point.id, point: point.store() };
    }
  };
};
export const addService = factory( ADD_SERVICE );
export const addAlert = factory( ADD_ALERT );
export const updateService = factory( UPDATE_SERVICE );

// # Rescind Point
// Allows the user to delete points that haven't yet been synced to another
// database. After a point is synced the first time, it cannot be deleted
export function rescindPoint( id ) {
  return { type: RESCIND_POINT, id };
}

// # Reload Points
// Creates an action to replace all points in the store. This is useful to
// load the store with initial point data and to refresh the store when
// the user scrolls to a new area of the map.
export function reloadPoints() {
  const points = new PointCollection();
  return dispatch => {
    points.fetch().then( res => {
      return points.getCovers();
    } ).then( res => {
      dispatch( { type: RELOAD_POINTS, points: points.store() } );
    } );
  };
}

export function resetPoints() {
  return dispatch => reset().then( database => dispatch( reloadPoints() ) );
}

// # Load Point
// Load a point into the store.
//
// If the point's id is already in the store, it is either already loaded, or it
// is currently being fetched. In either case, return immediately to avoid
// stack overflow.
//
// Otherwise, fetch the point from the database, and mark the point as fetching
// while it is being retrieved.
export function loadPoint( id ) {
  return ( dispatch, getState ) => {
    const {points} = getState().points;

    if ( !points[ id ] ) {
      dispatch( { type: REQUEST_LOAD_POINT, id } );

      const point = Point.for( id );
      return point.fetch().then( res => {
        dispatch( { type: RECEIVE_LOAD_POINT, point: point.store() } );
      } );
    }
  };
}

export function replicatePoints() {
  return dispatch => {
    const time = new Date().toISOString();
    dispatch( { type: REQUEST_REPLICATION, time } );

    local.replicate.from( remote ).then( result => {
      dispatch( { type: RECEIVE_REPLICATION, time: result.end_time } );
      dispatch( reloadPoints() );
    } ).catch( err => {
      dispatch( { type: RECEIVE_REPLICATION, time: err.end_time } );
      dispatch( setSnackbar( { message: 'Replication error' } ) );
    } );
  };
}

// # Replication Agent
// The agent's job is to continually dispatch a replication action at the
// specified interval from settings, but only if we're online. We restart
// the interval whenever:
//  1. The network state changes
//  2. The user specifies a new replication interval
//  3. The app resumes from sleep
//
// After the agent is run, you can stop the subscription on store by calling
// `stop()`.
export class ReplicationAgent extends Agent {
  constructor( store ) {
    super( store );
    this.store = store;
    this.interval = false;

    bindAll( this, 'update' );
  }

  select( state ) {
    return {
      isOnline: state.network.isOnline,
      repIvalM: state.settings.repIvalM || 10
    };
  }

  run() {
    const { store, select, update } = this;
    this.stop = observeStore( store, select, update );

    document.addEventListener( 'resume', update );
    update();
  }

  update() {
    const { isOnline, repIvalM } = this.select( this.store.getState() );

    clearTimeout( this.interval );
    if( isOnline ) {
      this.store.dispatch( replicatePoints() );
      this.interval = setInterval(
        () => this.store.dispatch( replicatePoints() ),
        repIvalM * 60 * 1000
      );

    }
  }
}
