import PouchDB from 'pouchdb';
import { bindAll, has } from 'underscore';
import docuri from 'docuri';
import config from 'config';

import { docToPoint, syncRecievePointHack, reloadPoints, syncDeletePoint } from './reducers/points'

const {protocol, domain, port} = config.get( 'Client.couch' );
const url = `${protocol}://${domain}:${port}/points`;

export default class Sync {

  constructor( local, gateway, store, filter ) {
    this.local = local;
    this.remote = new PouchDB( url );
    this.gateway = gateway;
    this.store = store;
    this.filter = ( doc ) => true;

    this.syncing = false;

    const route = 'point/:class/:name/:geohash';
    this.point = docuri.route( route );
    this.comment = docuri.route( route + '/comment/:uuid' );

    bindAll( this, 'update' );
  }

  start() {
    const {network} = this.store.getState();

    this.store.subscribe( this.update );

    if ( network.online ) {
      this.sync();
    }
  }

  update() {
    const {network} = this.store.getState();

    if ( network.online && !this.syncing ) {
      this.sync();
    } else if ( !network.online && this.syncing ) {
      this.rep.cancel();
    }
  }

  /**
   * TODO: find out why PouchDB is sending along an incorrect blob with
   * change notifications involving attachments.
   */
  sync() {
    this.syncing = true;

    this.rep = PouchDB.sync( this.local, this.remote, {
      live: true,
      retry: false
    } ).on( 'change', ( info ) => {
      if ( info.direction === 'pull' ) {
        if ( info.change.docs.length > 2 ) {
          this.gateway.getPoints().then( points => {
            this.store.dispatch( reloadPoints( points ) );
          } );
          return;
        }
        info.change.docs.forEach( doc => {
          const id = doc._id;

          let parts = this.point( id ); // First, see if the id matches a point
          if ( parts ) {
            if ( has( doc, '_deleted' ) ) {
              this.store.dispatch( syncDeletePoint( id ) );
            } else {
              this.store.dispatch( syncRecievePointHack( id, docToPoint( doc ) ) );
            }
          }
          parts = this.comment( id );
          if ( parts ) {
            // TODO: handle incoming comments
          }
        } );
      }
    } ).on( 'denied', ( info ) => {
      console.log( 'SYNC: `denied`: ' + info );
    } ).on( 'paused', ( ) => {
      console.log( 'SYNC: `paused`' );
    } ).on( 'active', ( ) => {
      console.log( 'SYNC: `active`' );
    } ).on( 'complete', ( info ) => {
      console.log( 'SYNC: `complete`' );
    } ).on( 'error', ( err ) => {
      console.log( 'SYNC: `error`: ' + err );
    } );
  }
}
