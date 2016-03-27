/*global process*/
import { assignIn } from 'lodash';
import { connectMut, models } from 'btc-models';
import PouchDB from 'pouchdb';
import config from 'config';

// If we are in development, set PouchDB on the window so we can use
// the [PouchDB inspector](https://pouchdb.com/guides/databases.html).
if ( process.env.NODE_ENV === 'development' ) {
  window.PouchDB = PouchDB;
}

export const local = new PouchDB( 'points' );
export default local;

connectMut( local, models );

export function reset() {
  return local.destroy().then(
    ( ) => assignIn( local, new PouchDB( 'points' ), { _destroyed: false } )
  );
}

const {protocol, domain, port} = config.get( 'Client.couch' );
const url = `${ protocol }://${ domain }:${ port }/points`;
export const remote = new PouchDB( url );
