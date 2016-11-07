import objectAssign from 'object-assign';

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';
export const SET_MAP_LOADING = 'SET_MAP_LOADING';
export const SET_GEO_LOCATION = 'SET_GEO_LOCATION';

const USMap = { center: [ 39.8145, -99.9946 ], zoom: 3 };

export default function map( state = { loading: true, center: USMap.center, zoom: USMap.zoom } , action ) {
  switch ( action.type ) {
  case SET_MAP_CENTER:
    return objectAssign( {}, state, { center: action.center } );
  case SET_MAP_ZOOM:
    return objectAssign( {}, state, { zoom: action.zoom } );
  case SET_MAP_LOADING:
    return objectAssign( {}, state, { loading: action.loading } );
  case SET_GEO_LOCATION:
    return objectAssign( {}, state, { geolocation: action.geolocation } );
  default:
    return state;
  }
}

export function setMapCenter( center ) {
  return { type: SET_MAP_CENTER, center };
}

export function setMapZoom( zoom ) {
  return { type: SET_MAP_ZOOM, zoom };
}

export function setMapLoading( loading ) {
  return { type: SET_MAP_LOADING, loading };
}

export function setGeoLocation( geolocation ) {
  return { type: SET_GEO_LOCATION, geolocation };
}
