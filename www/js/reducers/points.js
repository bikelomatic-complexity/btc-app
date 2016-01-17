
import {ADD_POINT, RESET_POINTS} from '../actions/point-actions'

export function points(state = [], action) {
  console.log('DISPATCH! ' + action.type);
  switch(action.type) {
    case ADD_POINT:
      return [
        ...state,
        Object.assign({}, action.point)
      ];
    case RESET_POINTS:
      return action.points;
    default:
      return state;
  }
}
