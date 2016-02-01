import { SET_FILTERS } from '../actions/map-actions';

export default function filters(state = {
  activeFilters:[], openServices:false, hideAlert:false
}, action) {
  switch(action.type) {
    case SET_FILTERS:
      return Object.assign({}, state, {
        activeFilters:[...action.filters.activeFilters],
        openServices:action.filters.openServices,
        hideAlert:action.filters.hideAlert
      });
    default:
      return state;
  }
}
