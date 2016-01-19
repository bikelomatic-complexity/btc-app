
import {
  ADD_POINT,
  UPDATE_POINT,
  RESCIND_POINT,
  REPLICATE_POINT,
  RELOAD_POINTS
} from '../actions/point-actions'

export function points(state = [], action) {
  switch(action.type) {
    case ADD_POINT:
      return [
        ...state,
        action.point
      ];
    case UPDATE_POINT:
      console.log('FIXME: `UPDATE_POINT`');
      return state;
    case RESCIND_POINT:
      console.log('FIXME: `RESCIND_POINT`');
      return state;
    case REPLICATE_POINT:
      console.log('FIXME: `REPLICATE_POINT`');
      return state;
    case RELOAD_POINTS:
      console.log('FIXME: `RELOAD_POINTS`');
      return state;
    default:
      return state;
  }
}
