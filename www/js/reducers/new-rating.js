export const SET_RATING = 'SET_RATING';

export function setRating(newRating) {
  return {
    type: SET_RATING,
    newRating
  }
}

export default function newRating(state = {rating:0}, action) {
  switch(action.type) {
    case SET_RATING:
      return Object.assign({}, state, {rating:action.newRating});
    default:
      return state;
  }
}
