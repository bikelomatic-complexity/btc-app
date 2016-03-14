import PouchDB from 'pouchdb';

if ( process.env.NODE_ENV === 'development' ) {
  window.PouchDB = PouchDB;
}

export const database = new PouchDB( 'bicycle-touring-companion-db' );
export default database;
