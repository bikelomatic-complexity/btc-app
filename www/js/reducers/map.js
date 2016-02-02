import { SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP_LOADING, SET_GEO_LOCATION } from '../actions/map-actions';

const USMap = {center:[39.8145, -99.9946], zoom:3};

export default function mapState(state = {loading:true, center:USMap.center, zoom:USMap.zoom}, action) {
  switch(action.type) {
    case SET_MAP_CENTER:
      return Object.assign({},state,{center:action.center});
    case SET_MAP_ZOOM:
      return Object.assign({},state,{zoom:action.zoom});
    case SET_MAP_LOADING:
      return Object.assign({},state,{loading:action.loading});
    case SET_GEO_LOCATION:
      return Object.assign({},state,{geolocation:action.geolocation});
    default:
      return state;
  }
}
