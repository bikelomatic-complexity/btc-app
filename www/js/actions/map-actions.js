/* Action Types */
export const SELECT_MARKER = 'SELECT_MARKER';
export const PEEK_MARKER = 'PEEK_MARKER';
export const FULLSCREEN_MARKER = 'FULLSCREEN_MARKER';
export const DESELECT_MARKER = 'DESELECT_MARKER';

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_LOADING = 'SET_MAP_LOADING';
export const SET_GEO_LOCATION = 'SET_GEO_LOCATION';

/* Action Creators */
export function selectMarker(marker) {
  return {
    type: SELECT_MARKER,
    marker
  }
}

export function peekMarker() {
  return {
    type: PEEK_MARKER
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

export function setMapCenter(center) {
  return {
    type: SET_MAP_CENTER,
    center
  }
}

export function setMapZoom(zoom) {
  return {
    type: SET_MAP_ZOOM,
    zoom
  }
}

export function setMapLoading(loading) {
  return {
    type: SET_MAP_LOADING,
    loading
  }
}

export function setGeoLocation(geolocation) {
  return {
    type: SET_GEO_LOCATION,
    geolocation
  }
}
