import { bindAll } from 'underscore';
import { USER_ADD, pointToDoc, docToPoint } from './reducers/points';

/**
 * The Gateway wraps the local PouchDB instance. It provides useful methods
 * so that the client does not have to deal with PouchDB response objects.
 *
 * The Gateway also supplies middleware to copy entities into PouchDB as they
 * are inserted into the store. TODO: Move this middleware out of the Gateway
 * and into the points Duck. That way, we can use the gateway inside the
 * points duck.
 */
export default class Gateway {
  constructor( db ) {
    this.db = db;

    bindAll( this, 'getMiddleware' );
  }

  getPouch() {
    return this.db;
  }

  /**
   * Retruns all docs in the database that have ids starting with the provided
   * keyword.
   */
  allDocsByClass( cls ) {
    return this.db.allDocs( {
      include_docs: true,
      attachments: true,
      binary: true,
      startkey: cls,
      endkey: cls + '\uffff'
    } );
  }

  /**
   * Returns all points in the database
   */
  getPoints() {
    return this.allDocsByClass( 'point' ).then( response => {
      return response.rows.map( row => docToPoint( row.doc ) );
    } );
  }

  /**
   * Monitors store transactions. As actions are performed on points the
   * middleware persists those actions in the database.
   */
  getMiddleware() {
    return store => next => action => {
      if ( action.type === USER_ADD ) {
        const doc = pointToDoc( action.point );

        this.db.post( doc ).then( response => {
          action.point = Object.assign( action.point, {
            _rev: response.rev
          } );
        } ).catch( err => {
          console.error( err );
        } ).then( ( ) => {
          next( action );
        } );
      } else {
        next( action );
      }
    };
  }
}
