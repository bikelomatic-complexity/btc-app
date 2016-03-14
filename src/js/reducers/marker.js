import gateway from '../gateway';
import { setMapCenter } from '../actions/map-actions';
import { withCover } from './points';

const SELECT_MARKER = 'btc-app/marker/SELECT_MARKER';
export const REQUEST_LOAD_MARKER = 'btc-app/marker/REQUEST_LOAD_MARKER';
export const RECEIVE_LOAD_MARKER = 'btc-app/marker/RECEIVE_LOAD_MARKER';

const initState = {
  _id: null,
  isFetching: false
}

export default function marker( state = initState, action ) {
  switch ( action.type ) {
  case SELECT_MARKER:
    return { ...state, ...action.marker };
  case REQUEST_LOAD_MARKER:
    // If we have already loaded the specified marker, of if we are currently
    // fetching the specified marker, then don't modify the state. This avoids
    // re-render loops when a React component calls `loadMarker`
    if( state._id === action.id ) {
      return state;
    } else {
      return { ...state, _id: action.id, isFetching: true };
    }
  case RECEIVE_LOAD_MARKER:
    return { ...state, isFetching: false, ...action.marker }
  default:
    return state;
  }
}

export function selectMarker( marker ) {
  return { type: SELECT_MARKER, marker };
}

// The map reducer also listens to RECIEVE_LOAD_MARKER to set the
// map's center.
export function loadMarker( id ) {
  return dispatch => {
    dispatch( requestLoadMarker( id ) );
    gateway.getPoint( id ).then(
      point => {
        dispatch( recieveLoadMarker( withCover( point, point.coverBlob ) ) );
      }
    );
  }
}

function requestLoadMarker( id ) {
  return { type: REQUEST_LOAD_MARKER, id };
}

function recieveLoadMarker( marker ) {
  return { type: RECEIVE_LOAD_MARKER, marker };
}
