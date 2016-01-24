import { combineReducers } from 'redux';
import { SELECT_MARKER, PEEK_MARKER, DESELECT_MARKER, FULLSCREEN_MARKER } from '../actions/map-actions';

export function marker(state = {showPointCard:'hide'}, action) {
  switch (action.type) {
    case SELECT_MARKER:
      return {
        selectedMarker: action.marker,
        showPointCard: 'peek'
      };
    case PEEK_MARKER:
      return {
        selectedMarker: state.selectedMarker,
        showPointCard: 'peek'
      };
    case DESELECT_MARKER:
      return {
        selectedMarker: state.selectedMarker,
        showPointCard: 'hide'
      };
    case FULLSCREEN_MARKER:
      return {
        selectedMarker: state.selectedMarker,
        showPointCard: 'full'
      };
    default:
      return state;
  }
}
