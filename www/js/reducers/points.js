
import {ADD_POINT, EDIT_POINT, DELETE_POINT} from '../actions/point-actions'

export function points(state = [], action) {
  switch(action.type) {
    case ADD_POINT:
      return [
        ...state,
        action.point
      ];
    case EDIT_POINT:
      console.log('FIXME: `EDIT_POINT`');
      return state;
    case DELETE_POINT:
      console.log('FIXME: `DELETE_POINT`');
      return state;
    case REPLICATE_POINT:
      console.log('FIXME: `REPLICATE_POINT`');
      return state;
    default:
      return state;
  }
}
