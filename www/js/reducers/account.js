import request from 'superagent';
import config from 'config';
import merge from 'lodash/merge';
import assign from 'lodash/assign';

import { User, Login } from 'btc-models';

const REQUEST_LOGIN = 'btc-app/account/REQUEST_LOGIN';
const RECEIVE_LOGIN = 'btc-app/account/RECEIVE_LOGIN';
const FAILED_LOGIN_VALIDATION = 'btc-app/account/FAILED_LOGIN_VALIDATION';
const LOGOUT = 'btc-app/account/LOGOUT';

const REQUEST_REGISTRATION = 'btc-app/account/REQUEST_REGISTRATION';
const RECEIVE_REGISTRATION = 'btc-app/account/RECEIVE_REGISTRATION';
const FAILED_REG_VALIDATION = 'btc-app/account/FAILED_REG_VALIDATION';

const initState = {
  login: {
    loggedIn: false,
    email: null,
    password: null,
    fetching: false, // true during login request
    received: false, // false until login response received
    validation: [],
    error: null
  },
  registration: {
    fetching: false, // true during registration request
    received: false, // false until registration response received
    validation: [],
    error: null
  }
};

function clear( state ) {
  return assign( {}, state, {
    login: {
      validation: [],
      error: null
    },
    registration: {
      validation: [],
      error: null
    }
  } );
}

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case REQUEST_LOGIN:
    return merge( {}, clear( state ), {
      login: {
        email: action.email,
        password: action.password,
        loggedIn: false,
        fetching: true
      }
    } );
  case RECEIVE_LOGIN:
    return merge( {}, clear( state ), {
      login: {
        token: action.token,
        roles: action.roles,
        error: action.error,
        loggedIn: action.loggedIn,
        fetching: false
      }
    } );
  case FAILED_LOGIN_VALIDATION:
    return merge( {}, clear( state ), {
      login: {
        validation: action.error,
        loggedIn: false,
        fetching: false
      }
    } );
  case LOGOUT:
    return assign( {}, initState );
  case REQUEST_REGISTRATION:
    return merge( {}, clear( state ), {
      registration: {
        fetching: true
      }
    } );
  case RECEIVE_REGISTRATION:
    return merge( {}, clear( state ), {
      registration: {
        error: action.error,
        received: true,
        fetching: false
      }
    } );
  case FAILED_REG_VALIDATION:
    return merge( {}, clear( state ), {
      registration: {
        validation: action.error,
        received: false,
        fetching: false
      }
    } );
  default:
    return state;
  }
}

const {protocol, domain, port} = config.get( 'Client.server' );
const baseUrl = `${protocol}://${domain}:${port}`;

const server = route => request
  .post( baseUrl + route )
  .set( 'Accept', 'application/json' )
  .set( 'Content-Type', 'application/json' );

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
      server( '/authenticate' )
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

// This action validates User attributes then sends a registration request
// to the api server.
export function register( attrs, success ) {
  // Short-circuit the request if there is a client side validation error
  const user = new User( attrs, { validate: true } );
  if ( user.validationError ) {
    return errorInRegistration( user.validationError );
  }

  return dispatch => {
    dispatch( requestRegistration( attrs ) );

    const promise = new Promise( ( resolve, reject ) => {
      server( '/register' )
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
      if ( success ) success();
    }, error => {
      dispatch( receiveRegistration( error ) );
    } );

    return promise;
  };
}

// The action to create when there are client-side validation errors
function errorInRegistration( error ) {
  return { type: FAILED_REG_VALIDATION, error };
}

// The action to create when we send the registration request to the server
function requestRegistration() {
  return { type: REQUEST_REGISTRATION };
}

// The action to create when there is a server error during registration
function receiveRegistration( error ) {
  return { type: RECEIVE_REGISTRATION, error };
}
