export const SET_RATING = 'SET_RATING';
export const SET_COMMENT = 'SET_COMMENT';

export function setRating(newRating) {
  return {
    type: SET_RATING,
    newRating
  }
}

export function setComment(newComment) {
  return {
    type: SET_COMMENT,
    newComment
  }
}

export default function newRating(state = {rating:0, comment:''}, action) {
  switch(action.type) {
    case SET_RATING:
      return Object.assign({}, state, {rating:action.newRating});
    case SET_COMMENT:
      return Object.assign({}, state, {comment:action.newComment});
    default:
      return state;
  }
}
