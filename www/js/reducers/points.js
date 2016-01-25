
import {findIndex} from 'underscore'

import {
  ADD_POINT,
  UPDATE_POINT,
  RESCIND_POINT,
  REPLICATE_POINT,
  RELOAD_POINTS
} from '../actions/point-actions'

export function points(state = [], action) {
  console.log('DISPATCHING: ' + action.type);
  switch(action.type) {
    case ADD_POINT:
      const newPoint = Object.assign({}, action.point, {imageBlob:action.imageBlob});
      return [
        ...state,
        newPoint
      ];
    case UPDATE_POINT:
      console.log('FIXME: `UPDATE_POINT`');
      return state;
    case RESCIND_POINT:
      console.log('FIXME: `RESCIND_POINT`');
      return state;
    case REPLICATE_POINT:
      const index = findIndex(state, point => point._id === action.id)
      if(action.deleted) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1, state.length)
        ];
      } else if(index === -1) { // Replicated point is new
        return [
          ...state,
          action.point
        ]
      } else { // Replicated point is an edit
        return [
          ...state.slice(0, index),
          action.point,
          ...state.slice(index + 1, state.length)
        ];
      }
    case RELOAD_POINTS:
      console.log('FIXME: `RELOAD_POINTS`');
      return state;
    default:
      return state;
  }
}
