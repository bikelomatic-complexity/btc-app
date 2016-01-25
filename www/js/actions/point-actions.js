
export const ADD_POINT = 'ADD_POINT';
export function addPoint(point, imageBlob) {
  return {
    type: ADD_POINT,
    point,
    imageBlob
  };
}

export const RESCIND_POINT = 'DELETE_POINT';
export function deletePoint(id) {
  return {
    type: DELETE_POINT,
    id
  };
}

export const UPDATE_POINT = 'UPDATE_POINT';
export function updatePoint(id, point) {
  return {
    type: UPDATE_POINT,
    id,
    point
  };
}

export const REPLICATE_POINT = 'REPLICATE_POINT';
export function replicatePoint(id, point, deleted) {
  return {
    type: REPLICATE_POINT,
    id,
    point,
    deleted
  };
}

export const RELOAD_POINTS = 'RESET_POINTS';
export function resetPoints(points) {
  return {
    type: RESET_POINTS,
    points
  };
}
