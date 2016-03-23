
import { Point, Service, Alert, PointCollection } from 'btc-models';
import { assign, merge, omit } from 'lodash';

export const ADD_SERVICE = 'btc-app/points/ADD_SERVICE';
export const ADD_ALERT = 'btc-app/points/ADD_ALERT';
export const UPDATE_SERVICE = 'btc-app/points/UPDATE_SERVICE';
export const RESCIND_POINT = 'btc-app/points/RESCIND_POINT';
export const RELOAD_POINTS = 'btc-app/points/RELOAD_POINTS';
export const REQUEST_LOAD_POINT = 'btc-app/points/REQUEST_LOAD_POINT';
export const RECEIVE_LOAD_POINT = 'btc-app/points/RECEIVE_LOAD_POINT';

export default function reducer( state = {}, action ) {
  switch ( action.type ) {
  case UPDATE_SERVICE:
  case ADD_SERVICE:
  case ADD_ALERT:
    return assign( {}, state, { [ action.id ]: action.point } );
  case RESCIND_POINT:
    return omit( state, action.id );
  case RELOAD_POINTS:
    return action.points;
  case REQUEST_LOAD_POINT:
    console.log( action.id );
    return merge( {}, state, { [ action.id ]: {
      isFetching: true
    } } );
  case RECEIVE_LOAD_POINT:
    return merge( {}, state, { [ action.id ]: {
      isFetching: false, ...action.point
    } } );
  default:
    return state;
  }
}

const factory = ( model, type ) => {
  return ( point, coverBlob ) => {
    if( !point.isValid() ) {
      console.error( 'the submitted point was not valid!' );
    } else {
      point.specify();
      point.save().then( res => {
        if( coverBlob ) {
          return point.attach( coverBlob );
        }
      } );
      return { type, id: point.id, point: point.store() };
    }
  };
};
export const addService = factory( Service, ADD_SERVICE );
export const addAlert = factory( Alert, ADD_ALERT );
export const updateService = factory( Service, UPDATE_SERVICE );

// Allows the user to delete points that haven't yet been synced to another
// database. After a point is synced the first time, it cannot be deleted
export function rescindPoint( id ) {
  return { type: RESCIND_POINT, id };
}

// Creates an action to replace all points in the store. This is useful to
// load the store with initial point data and to refresh the store when
// the user scrolls to a new area of the map.
export function reloadPoints( ) {
  return dispatch => new PointCollection().fetch().then( res => {
    dispatch( { type: RELOAD_POINTS, points: res.collection.store() } );
  } );
}

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
    const {points} = getState();

    if ( points[ id ] ) {
      return Promise.resolve();
    } else {
      dispatch( { type: REQUEST_LOAD_POINT, id } );

      const point = Point.for( id );
      return point.fetch().then( res => {
        dispatch( { type: RECEIVE_LOAD_POINT, point: point.store() } );
      } );
    }
  };
}
