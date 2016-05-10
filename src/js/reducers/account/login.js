import assign from 'lodash/assign';

import { Login } from 'btc-models';
import { request } from '../../util/server';

const REQUEST_LOGIN = 'btc-app/account/REQUEST_LOGIN';
const RECEIVE_LOGIN = 'btc-app/account/RECEIVE_LOGIN';
const FAILED_LOGIN_VALIDATION = 'btc-app/account/FAILED_LOGIN_VALIDATION';
const LOGOUT = 'btc-app/account/LOGOUT';

const initState = {
  loggedIn: false,
  email: null,
  password: null,
  fetching: false, // true during login request
  received: false, // false until login response received
  validation: [],
  error: null
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case REQUEST_LOGIN:
    return assign( {}, state, {
      loggedIn: false,
      email: action.email,
      password: action.password,
      fetching: true,
      validation: [],
      error: null
    } );
  case RECEIVE_LOGIN:
    return assign( {}, state, {
      loggedIn: action.loggedIn,
      fetching: false,
      token: action.token,
      roles: action.roles,
      validation: [],
      error: action.error || null
    } );
  case FAILED_LOGIN_VALIDATION:
    return assign( {}, state, {
      loggedIn: false,
      fetching: false,
      validation: action.error || []
    } );
  case LOGOUT:
    return assign( {}, initState );
  default:
    return state;
  }
}

// Asyncronous action creator that will ask the app server for an api
// token, given the user's email and password.
//
// When dispatched, the dispatch function will return a promise that
// resolves if login is successful and rejects otherwise.
export function login( attrs, success ) {
  // Short-circuit the request if there is a client side validation error
  const user = new Login( attrs, { validate: true } );
  if ( user.validationError ) {
    return errorInLogin( user.validationError );
  }

  return dispatch => {
    dispatch( requestLogin( attrs.email, attrs.password ) );

    return new Promise( ( resolve, reject ) => {
      request.post( '/authenticate' )
        .set( 'Content-Type', 'application/json' )
        .send( attrs )
        .end( ( error, response ) => {
          switch ( response.statusCode ) {
          case 200:
            resolve( response.body.auth_token );
            break;
          case 400:
          default:
            reject( response.body.unauthorized );
            break;
          }
        } );
    } ).then( auth_token => {
      dispatch( recieveLogin( auth_token ) );
      if ( success ) {
        success();
      }
    }, error => {
      dispatch( recieveLogin( null, error ) );
    } );
  };
}

// The action to create when there are client-side validation errors
function errorInLogin( error ) {
  return { type: FAILED_LOGIN_VALIDATION, error };
}

// Notify the store that a login request has begun
function requestLogin( email, password ) {
  return { type: REQUEST_LOGIN, email, password };
}

// Notify the store that a login request has completed, and pass in
// either the new credentials or the error message
function recieveLogin( token, error ) {
  const action = { type: RECEIVE_LOGIN, token, error };
  if ( error ) {
    action.loggedIn = false;
  } else {
    action.loggedIn = true;
  }
  return action;
}

// Notify the store to log out the user
export function logout() {
  return { type: LOGOUT };
}
