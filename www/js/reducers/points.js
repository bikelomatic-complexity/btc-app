
import {ADD_POINT, RESET_POINTS} from '../actions/point-actions'

export function points(state = [], action) {
  switch(action.type) {
    case ADD_POINT:
      const newPoint = Object.assign({}, action.point, {imageBlob:action.imageBlob});
      return [
        ...state,
        newPoint
      ];
    case RESET_POINTS:
      return action.points;
    default:
      return state;
  }
}
