import PouchDB from 'pouchdb';
import { bindAll, has } from 'underscore';
import docuri from 'docuri';
import config from 'config';

import { docToPoint, syncRecievePointHack, reloadPoints, syncDeletePoint } from './reducers/points';

const {protocol, domain, port} = config.get( 'Client.couch' );
const url = `${protocol}://${domain}:${port}/points`;

export default class Sync {
  constructor( local, store, filter ) {
    this.local = local;
    this.remote = new PouchDB( url );
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
}
