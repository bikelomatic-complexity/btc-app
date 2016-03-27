import { SET_FILTERS } from '../actions/map-actions';

const initState = {
  activeFilters: [],
  openServices: false,
  hideAlert: false
};

export default function filters( state = initState, action ) {
  switch ( action.type ) {
  case SET_FILTERS:
    return Object.assign( {}, state, {
      activeFilters: [ ...action.filters.activeFilters ],
      openServices: action.filters.openServices,
      hideAlert: action.filters.hideAlert
    } );
  default:
    return state;
  }
}
