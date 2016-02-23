import defaults from 'superagent-defaults';
import config from 'config';
import { has } from 'underscore';

import { User } from 'btc-models';

const {protocol, domain, port} = config.get( 'Client.server' );
const baseUrl = `${protocol}://${domain}:${port}`;

const REQUEST_LOGIN = 'btc-app/account/REQUEST_LOGIN';
const RECEIVE_LOGIN = 'btc-app/account/RECEIVE_LOGIN';
const LOGOUT = 'btc-app/account/LOGOUT';
const REQUEST_REGISTRATION = 'btc-app/account/REQUEST_REGISTRATION';
const RECEIVE_REGISTRATION = 'btc-app/account/RECEIVE_REGISTRATION';
const ERROR_IN_REGISTRATION = 'btc-app/account/ERROR_IN_REGISTRATION';

const initState = {
  loggedIn: false,
  fetchingLogin: false, // False until login response arrives
  fetchingRegistration: false, // False until registration response arrives
  received: false // True when a request has completed
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case REQUEST_LOGIN:
    return Object.assign( {}, state, {
      email: action.email,
      password: action.password,
      fetchingLogin: true,
      loggedIn: false
    } );
  case RECEIVE_LOGIN:
    return Object.assign( {}, state, {
      token: action.token,
      roles: action.roles,
      error: action.error,
      fetchingLogin: false,
      loggedIn: action.loggedIn
    } );
  case LOGOUT:
    return Object.assign( {}, initState );
  case ERROR_IN_REGISTRATION:
    return Object.assign( {}, state, {
      fetchingRegistration: false,
      registrationError: action.error
    } );
  case REQUEST_REGISTRATION:
    return Object.assign( {}, state, {
      fetchingRegistration: true
    } );
  case RECEIVE_REGISTRATION:
    return Object.assign( {}, state, {
      received: true,
      registrationError: action.error,
      fetchingRegistration: false
    } );
  default:
    return state;
  }
}

const server = defaults()
  .set( 'Accept', 'application/json' )
  .set( 'Content-Type', 'application/json' );

// Asyncronous action creator that will ask the app server for an api
// token, given the user's email and password.
//
// When dispatched, the dispatch function will return a promise that
// resolves if login is successful and rejects otherwise.
export function login( email, password ) {
  return dispatch => {
    dispatch( requestLogin( email, password ) );

    const promise = new Promise( ( resolve, reject ) => {
      server.post( baseUrl + '/authenticate' )
        .send( { email, password } )
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
    } );

    promise.then( auth_token => {
      dispatch( recieveLogin( auth_token ) );
    }, error => {
      dispatch( recieveLogin( null, error ) );
    } );

    return promise;
  };
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

// This action validates User attributes then sends a registration request
// to the api server.
export function register( email, password, username, first, last ) {
  const attrs = { email, password, username, first, last };

  // Short-circuit the request if there is a client side validation error
  const user = new User( attrs, { validate: true } );
  if ( user.validationError ) {
    return errorInRegistration( user.validationError );
  }

  return dispatch => {
    dispatch( requestRegistration( attrs ) );

    const promise = new Promise( ( resolve, reject ) => {
      server.post( baseUrl + '/register' )
        .send( attrs )
        .end( ( error, response ) => {
          switch ( response.statusCode ) {
          case 200:
            resolve();
            break;
          case 400:
          default:
            reject( response.body.error );
            break;
          }
        } );
    } );

    promise.then( ( ) => {
      dispatch( receiveRegistration() );
    }, error => {
      dispatch( receiveRegistration( error ) );
    } );

    return promise;
  };
}

// The action to create when there are client-side validation errors
function errorInRegistration( error ) {
  return { type: ERROR_IN_REGISTRATION, error };
}

// The action to create when we send the registration request to the server
function requestRegistration() {
  return { type: REQUEST_REGISTRATION };
}

// The action to create when there is a server error during registration
function receiveRegistration( error ) {
  return { type: RECEIVE_REGISTRATION, error };
}
