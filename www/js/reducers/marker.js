import { combineReducers } from 'redux';
import { SELECT_MARKER, PEEK_MARKER, DESELECT_MARKER, FULLSCREEN_MARKER } from '../actions/map-actions';

export default function marker(state = {}, action) {
  switch (action.type) {
    case SELECT_MARKER:
      return action.marker
    default:
      return state;
  }
}
