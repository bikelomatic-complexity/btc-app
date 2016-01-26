import PouchDB from 'pouchdb'
import { bindAll, has } from 'underscore'
import { docToPoint, syncRecievePoint, syncDeletePoint } from './reducers/points'

import { COUCHDB_REMOTE_SERVER } from './config'

export default class Sync {

  constructor(local, store, filter) {
    this.local = local;
    this.remote = new PouchDB(COUCHDB_REMOTE_SERVER);
    this.store = store;
    this.filter = (doc) => true;

    this.syncing = false;

    bindAll(this, 'update');
  }

  start() {
    const { network } = this.store.getState();

    this.store.subscribe(this.update);

    if(network.online) {
      this.sync();
    }
  }

  update() {
    const { network } = this.store.getState();

    if(network.online && !this.syncing) {
      this.sync();
    } else if(!network.online && this.syncing) {
      this.rep.cancel();
    }
  }

  sync() {
    this.syncing = true;

    this.rep = PouchDB.sync(this.local, this.remote, {
      live: true,
      retry: false
    }).on('change', (info) => {
      if(info.direction === 'pull') {
        const [doc, ...others] = info.change.docs;

        if(has(doc, '_deleted')) {
          this.store.dispatch(syncDeletePoint(doc._id));
        } else if(doc.class === 'service') {
          const point = docToPoint(doc);
          this.store.dispatch(syncRecievePoint(doc._id, point));
        }
      }
    }).on('denied', (info) => {
      console.log('SYNC: `denied`: ' + info);
    }).on('paused', () => {
      console.log('SYNC: `paused`');
    }).on('active', () => {
      console.log('SYNC: `active`');
    }).on('complete', (info) => {
      console.log('SYNC: `complete`');
    }).on('error', (err) => {
      console.log('SYNC: `error`: ' + err);
    });
  }
}
