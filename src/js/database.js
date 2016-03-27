/*global process*/
import PouchDB from 'pouchdb';

// If we are in development, set PouchDB on the window so we can use
// the [PouchDB inspector](https://pouchdb.com/guides/databases.html).
if ( process.env.NODE_ENV === 'development' ) {
  window.PouchDB = PouchDB;
}

export const database = new PouchDB( 'bicycle-touring-companion-db' );
export default database;
