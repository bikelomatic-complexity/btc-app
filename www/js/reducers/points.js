
import {ADD_POINT} from '../actions/point-actions'

export function points(state = [], action) {
  switch(action.type) {
    case ADD_POINT:
      return [
        ...state,
        Object.assign({}, action.point)
      ]
    default:
      return state
  }
}
