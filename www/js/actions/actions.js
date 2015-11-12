/* Action Types */
export const SELECT_MARKER = 'SELECT_MARKER';
export const DESELECT_MARKER = 'DESELECT_MARKER';

/* Action Creators */
export function selectMarker(marker) {
  return {
    type: SELECT_MARKER,
    marker
  }
}

export function deselectMarker() {
  return {
    type: DESELECT_MARKER
  }
}
