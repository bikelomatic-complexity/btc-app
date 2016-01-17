
export const ADD_POINT = 'ADD_POINT';
export function addPoint(point) {
  return {
    type: ADD_POINT,
    point
  };
}
