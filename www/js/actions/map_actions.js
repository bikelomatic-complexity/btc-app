/* Action Types */
export const SELECT_MARKER = 'SELECT_MARKER';
export const PEEK_MARKER = 'PEEK_MARKER';
export const FULLSCREEN_MARKER = 'FULLSCREEN_MARKER';
export const DESELECT_MARKER = 'DESELECT_MARKER';

/* Action Creators */
export function selectMarker(marker) {
  return {
    type: SELECT_MARKER,
    marker
  }
}

export function peekMarker(marker) {
  return {
    type: PEEK_MARKER,
  }
}

export function fullscreenMarker() {
  return {
    type: FULLSCREEN_MARKER
  }
}

export function deselectMarker() {
  return {
    type: DESELECT_MARKER
  }
}
