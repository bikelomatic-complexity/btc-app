
import request from 'request';

import { APP_SERVER_URL as baseUrl } from '../config';

const REQUEST_LOGIN = 'btc-app/account/REQUEST_LOGIN';
const RECEIVE_LOGIN = 'btc-app/account/RECEIVE_LOGIN';
const LOGOUT = 'btc-app/account/LOGOUT';

const initState = {
  loggedIn: false,
  fetching: false
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case REQUEST_LOGIN:
    return Object.assign( {}, state, {
      email: action.email,
      password: action.password,
      fetching: true,
      loggedIn: false
    } );
  case RECEIVE_LOGIN:
    return Object.assign( {}, state, {
      token: action.token,
      roles: action.roles,
      error: action.error,
      fetching: false,
      loggedIn: action.loggedIn
    } );
  case LOGOUT:
    return Object.assign( {}, initState );
  default:
    return state;
  }
}

/*
 * Default request configuration to query the app server api
 */
const server = request.defaults( {
  baseUrl,
  json: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
} );

/*
 * Asyncronous action creator that will ask the app server for an api
 * token, given the user's email and password.
 *
 * When dispatched, the dispatch function will return a promise that
 * resolves if login is successful and rejects otherwise.
 */
export function login( email, password ) {
  return dispatch => {
    dispatch( requestLogin( email, password ) );

    const promise = new Promise( ( resolve, reject ) => {
      server.post(
        '/authenticate'
        , { body: { email, password } }
        , ( error, response, body ) => {
          switch ( response.statusCode ) {
          case 200:
            resolve( body.auth_token );
            break;
          case 400:
          default:
            reject( body.unauthorized );
            break;
          }
        }
      );
    } );

    promise.then( auth_token => {
      dispatch( recieveLogin( auth_token ) );
    }, error => {
      dispatch( recieveLogin( null, error ) );
    } );

    return promise;
  };
}

/*
 * Notify the store that a login request has begun
 */
function requestLogin( email, password ) {
  return { type: REQUEST_LOGIN, email, password };
}

/*
 * Notify the store that a login request has completed, and pass in
 * either the new credentials or the error message
 */
function recieveLogin( token, error ) {
  const action = { type: RECEIVE_LOGIN, token, error };
  if ( error ) {
    action.loggedIn = false;
  } else {
    action.loggedIn = true;
  }
  return action;
}

/*
 * Notify the store to log out the user 
 */
export function logout() {
  return { type: LOGOUT };
}
