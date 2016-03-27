
import { findIndex, omit, values, has } from 'underscore';
import { defaults } from 'lodash';
import { createObjectURL } from 'blob-util';
import toId from 'to-id';
import ngeohash from 'ngeohash';
import db from '../database';

import attach from '../util/attach';

export const USER_ADD = 'pannier/points/USER_ADD';
export const USER_RESCIND = 'pannier/points/DELETE_POINT';
export const USER_UPDATE = 'pannier/points/USER_UPDATE';
export const SYNC_RECEIVE = 'pannier/points/SYNC_RECEIVE';
export const SYNC_DELETE = 'pannier/points/DELETE';
export const RELOAD = 'pannier/points/RELOAD';

function helpSyncReceive( state, action ) {
  const pointIdx = findIndex( state, point => point._id === action.id );

  if ( pointIdx === -1 ) { // Replicated point is new
    return [ ...state, action.point ];
  } else { // Replicated point is an edit
    return values( Object.assign( {}, state, { [pointIdx]: action.point } ) );
  }
}

function helpSyncDelete( state, action ) {
  const pointIdx = findIndex( state, point => point._id === action.id );
  return values( omit( state, pointIdx ) );
}

export default function reducer( state = [], action ) {
  switch ( action.type ) {
  case USER_ADD:
    return [ ...state, action.point ];
  case USER_UPDATE:
    return state;
  case USER_RESCIND:
    return state;
  case SYNC_RECEIVE:
    return helpSyncReceive( state, action );
  case SYNC_DELETE:
    return helpSyncDelete( state, action );
  case RELOAD:
    return action.points;
  default:
    return state;

  }
}

function pointId( cls, name, location ) {
  const [lat, lon] = location;
  return `point/${cls}/${toId( name )}/${ngeohash.encode( lat, lon )}`;
}

/*
 * Creates an action to add a new point on behalf of the user. If a cover
 * image for the point is provided as a blob, it will be converted to an
 * object url at this point.
 */
export function userAddPoint( point, coverBlob ) {
  point._id = pointId( point.class, point.name, point.location );
  return {
    type: USER_ADD,
    point: withCover( point, coverBlob )
  };
}

/*
 * Allows the user to delete points that haven't yet been synced to another
 * database. After a point is synced the first time, it cannot be deleted
 */
export function userRescindPoint( id ) {
  return { type: USER_RESCIND, id };
}

/*
 * Bring a point up do date with the latest information, or, check in.
 */
export function userUpdatePoint( id, point ) {
  return { type: USER_UPDATE, id, point };
}

/*
 * Create a PouchDB instance for the local database. This is a hack for now
 * so we can get attachments in syncRecieve point. PouchDB isn't returning
 * a blob along with change notifications in sync.js
 *
 * TODO: figure that out
 *
 * Creates an action on behalf of the database sync agent to insert a point
 * into the store that has just been recieved from a remote database.
 */
export function syncRecievePointHack( id, point ) {
  if ( point.coverBlob ) {
    return dispatch => {
      return db.getAttachment( id, 'cover.png' ).then( blob => {
        point.coverBlob = blob;
        dispatch( syncRecievePoint( id, point ) );
      } ).catch( err => {
        point.coverBlob = undefined;
        dispatch( syncRecievePoint( id, point ) );
      } );
    };
  } else {
    return syncRecievePoint( id, point );
  }
}

export function syncRecievePoint( id, point ) {
  return {
    type: SYNC_RECEIVE,
    id,
    point: withCover( point, point.coverBlob )
  };
}

/*
 * Creates an action on behalf of the database sync agent to delete a point
 * from the store that has just been deleted upon sync with a remote database.
 */
export function syncDeletePoint( id ) {
  return { type: SYNC_DELETE, id };
}

/*
 * Creates an action to replace all points in the store. This is useful to
 * load the store with initial point data and to refresh the store when
 * the user scrolls to a new area of the map.
 */
export function reloadPoints( points ) {
  return {
    type: RELOAD,
    points: points.map( point => withCover( point, point.coverBlob ) )
  };
}

/*
 * Utility function to convert a point to its document representation.
 * internally, this coverts coverBlob into PouchDB attachment format. Since
 * we store the cover image as an attachment, we don't want to store
 * the `coverBlob` and `coverUrl` properties of the point.
 */
export function pointToDoc( point ) {
  let doc;
  if ( point.coverBlob ) {
    doc = attach( point, 'cover.png', 'image/png', point.coverBlob );
  } else {
    doc = point;
  }

  return omit( doc, 'coverBlob', 'coverUrl' );
}

/*
 * Utility function to convert a PouchDB document to a point that can be
 * ingested by the store.
 */
export function docToPoint( doc ) {
  let point;
  if ( has( doc, '_attachments' ) && has( doc[ '_attachments' ], 'cover.png' ) ) {
    point = Object.assign( {}, doc, {
      coverBlob: doc[ '_attachments' ][ 'cover.png' ].data
    } );
  } else {
    point = Object.assign( {}, doc );
  }

  // TODO: move this to btc-models eventually
  defaults( point, {
    amenities: []
  } );

  return point;
}

/*
 * Utility function to convert a cover image blob to an object url and then
 * merge that url with the point.
 */
export function withCover( point, coverBlob ) {
  let withCover;

  if ( coverBlob ) {
    const coverUrl = createObjectURL( coverBlob );
    withCover = Object.assign( {}, point, { coverBlob, coverUrl } );
  } else {
    withCover = Object.assign( {}, point );
  }

  return withCover;
}
