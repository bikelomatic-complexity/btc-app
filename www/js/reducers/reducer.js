import { combineReducers } from 'redux';
import { SELECT_MARKER, DESELECT_MARKER } from '../actions/actions';

function marker(state = {}, action) {
  switch (action.type) {
    case SELECT_MARKER:
      return {
        selectedMarker: action.marker,
        showCard: true
      };
    case DESELECT_MARKER:
      return {
        selectedMarker: state.selectedMarker,
        showCard: false
      };
    default:
      return state;
  }
}

const clientApp = combineReducers({
  marker
});

export default clientApp;
