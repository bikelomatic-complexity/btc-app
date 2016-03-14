import { find, assign } from 'lodash';
import gateway from '../gateway';
import { withCover } from './points';

export const REQUEST_LOAD_MARKER = 'btc-app/marker/REQUEST_LOAD_MARKER';
export const RECEIVE_LOAD_MARKER = 'btc-app/marker/RECEIVE_LOAD_MARKER';

// The shape of the marker state.
// Markers may be loaded, fetching, or reset.
//
//  - When reset, _id must be null. This means there is no marker loaded.
//  - When fetching or loaded, _id must be set to the _id of the point we are
//    fetching or that is already loaded.
//  - Otherwise, the state should match the fields of a point.
//
// isFetching should be true initially so we don't attempt to render a point
// card before it is ready.
const initState = {
  _id: null,
  isFetching: true
}

export default function marker( state = initState, action ) {
  switch ( action.type ) {
  case REQUEST_LOAD_MARKER:
    // Start the marker load process, but only if needed.
    //
    // If we have already loaded the specified marker, of if we are currently
    // fetching the specified marker, then don't modify the state. This avoids
    // re-render loops when a React component calls `loadMarker`
    if( state._id === action.id ) {
      return state;
    } else {
      return assign( {}, { _id: action.id }, { isFetching: true } );
    }
  case RECEIVE_LOAD_MARKER:
    // Pull the loaded marker into the state.
    //
    // We start with a fresh object to ensure no state from the previously
    // loaded marker makes it into the newly loaded marker.
    return assign( {}, { isFetching: false }, action.marker );
  default:
    return state;
  }
}

// Load a marker into the store.
// If the marker is already loaded, return immediately. If the marker is
// available in the points array, grab it from there. In the worst case,
// query the database for the point directly (this is the slowest).
//
// NOTE: If you want to set the map center to match the loaded point, you
// need to enable that functionality in the map reducer.
export function loadMarker( id ) {
  return (dispatch, getState) => {
    const { marker, points } = getState();
    let cache;

    if( isLoaded( marker, id ) ) {
      return;
    } else if( cache = isCached( points, id ) ) {
      dispatch( recieveLoadMarker( cache ) );
    } else {
      dispatch( requestLoadMarker( id ) );
      return gateway.getPoint( id ).then(
        point => {
          dispatch( recieveLoadMarker( withCover( point, point.coverBlob ) ) );
        }
      );
    }
  }
}

// Return true if the marker with `id` is already loaded into the store
function isLoaded( marker, id ) {
  return !marker.isFetching && marker._id === id;
}

// Return a cached marker with `id` if it exists in the cache
function isCached( points, id ) {
  return find( points, { _id: id } );
}

// Begin an async call to load the marker with `id` into the store
function requestLoadMarker( id ) {
  return { type: REQUEST_LOAD_MARKER, id };
}

// End an async call to load the marker with `id` into the store
function recieveLoadMarker( marker ) {
  return { type: RECEIVE_LOAD_MARKER, marker };
}
