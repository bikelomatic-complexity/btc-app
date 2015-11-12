import { combineReducers } from 'redux';
import { SELECT_MARKER, DESELECT_MARKER } from '../actions/actions';

function marker(state = {}, action) {
  switch (action.type) {
    case SELECT_MARKER:
      console.log("SELECTED A MARKER");
      return {
        selectedMarker: action.marker,
        showCard: true
      };
    case DESELECT_MARKER:
      console.log("DESELECTED A MARKER");
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
