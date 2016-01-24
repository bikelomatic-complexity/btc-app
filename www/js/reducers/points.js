
import {ADD_POINT, RESET_POINTS} from '../actions/point-actions'

export function points(state = [], action) {
  switch(action.type) {
    case ADD_POINT:
      return [
        ...state,
        action.point
      ];
    case RESET_POINTS:
      return action.points;
    default:
      return state;
  }
}
