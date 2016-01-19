
export const ADD_POINT = 'ADD_POINT';
export function addPoint(point) {
  return {
    type: ADD_POINT,
    point
  };
}

export const RESET_POINTS = 'RESET_POINTS';
export function resetPoints(points) {
  return {
    type: RESET_POINTS,
    points
  };
};
