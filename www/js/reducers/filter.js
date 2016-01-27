import { SET_FILTERS } from '../actions/map-actions';

export function filters(state = {
  activeFilters:[], openServices:false, hideAlert:false
}, action) {
  switch(action.type) {
    case SET_FILTERS:
      return action.filters;
    default:
      return state;
  }
}
