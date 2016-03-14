import gateway from '../gateway';
import { withCover } from '../reducers/points';

/* Action Types */
export const SET_POINT_NAME = 'SET_POINT_NAME';
export const SET_POINT_LOCATION = 'SET_POINT_LOCATION';
export const SET_POINT_TYPE = 'SET_POINT_TYPE';
export const SET_POINT_DESCRIPTION = 'SET_POINT_DESCRIPTION';
export const SET_POINT_ADDRESS = 'SET_POINT_ADDRESS';
export const SET_POINT_IMAGE = 'SET_POINT_IMAGE';
export const SET_POINT_WEBSITE = 'SET_POINT_WEBSITE';
export const SET_POINT_PHONE = 'SET_POINT_PHONE';

export const ADD_POINT_HOURS = 'ADD_POINT_HOURS';
export const REMOVE_POINT_HOURS = 'REMOVE_POINT_HOURS';

export const ADD_POINT_AMENITIES = 'ADD_POINT_AMENITIES';
export const REMOVE_POINT_AMENITIES = 'REMOVE_POINT_AMENITIES';

export const CLEAR_POINT_PROPS = 'CLEAR_POINT_PROPS';
export const SET_POINT_PROPS = 'SET_POINT_PROPS';

export const UPDATE_POINT_PROPS = 'UPDATE_POINT_PROPS';
export const RECEIVE_LOAD_POINT = 'RECEIVE_LOAD_POINT';
export const REQUEST_LOAD_POINT = 'REQUEST_LOAD_POINT';

/* Action Creators */
export function setPointName( name ) {
  return { type: SET_POINT_NAME, name };
}

export function setPointLocation( location ) {
  return { type: SET_POINT_LOCATION, location };
}

export function setPointType( pointType ) {
  return { type: SET_POINT_TYPE, pointType };
}

export function setPointDescription( description ) {
  return { type: SET_POINT_DESCRIPTION, description };
}

export function setPointAddress( address ) {
  return { type: SET_POINT_ADDRESS, address };
}

export function setPointImage( imageSrc ) {
  return { type: SET_POINT_IMAGE, imageSrc };
}

export function setPointWebsite( website ) {
  return { type: SET_POINT_WEBSITE, website };
}

export function setPointPhone( phoneNumber ) {
  return { type: SET_POINT_PHONE, phoneNumber };
}

export function addPointHours( newHours ) {
  return { type: ADD_POINT_HOURS, newHours };
}

export function removePointHours( hourIndex ) {
  return { type: REMOVE_POINT_HOURS, hourIndex };
}

export function addPointAmenity( newAmenity ) {
  return { type: ADD_POINT_AMENITIES, newAmenity };
}

export function removePointAmenity( amenityIndex ) {
  return { type: REMOVE_POINT_AMENITIES, amenityIndex };
}

export function clearPointProps() {
  return { type: CLEAR_POINT_PROPS };
}

export function setPointProps( point ) {
  return { type: SET_POINT_PROPS, point };
}

export function updatePointProps( point ) {
  return { type: UPDATE_POINT_PROPS, point };
}

export function loadPoint( id ) {
  return dispatch => {
    dispatch( requestLoadPoint( id ) );

    gateway.getPoint( id ).then( point => {
      dispatch( receiveLoadPoint( id, withCover( point, point.coverBlob ) ) );
    } );
  }
}

function requestLoadPoint( id ) {
  return { type: REQUEST_LOAD_POINT, id };
}

function receiveLoadPoint( id, point ) {
  return { type: RECEIVE_LOAD_POINT, id, point };
}
