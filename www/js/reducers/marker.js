import { SELECT_MARKER } from '../actions/map-actions';

export default function marker( state = {}, action ) {
  switch ( action.type ) {
  case SELECT_MARKER:
    return action.marker;
  default:
    return state;
  }
}
