import PouchDB from 'pouchdb'
import { bindAll, has } from 'underscore'
import { syncRecievePoint, syncDeletePoint } from './actions/point-actions'

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
      console.log('STARTING SYNC');
      this.sync();
    }
  }

  update() {
    const { network } = this.store.getState();
    console.log('UPDATE!');

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
      console.log(info.direction);
      if(info.direction === 'pull') {

        const [doc, ...others] = info.change.docs;
        if(doc.class === 'service') {

          const deleted = has(doc, '_deleted');
          if(deleted) {
            this.store.dispatch(syncDeletePoint(doc._id));
          } else {
            this.store.dispatch(syncRecievePoint(doc._id, doc));
          }
        }
      }
    }).on('denied', (info) => {
      console.log('FIXME: `live denied`: ' + info);
    }).on('paused', () => {
      console.log('FIXME: `live paused`');
    }).on('active', () => {
      console.log('FIXME: `live active`');
    }).on('complete', (info) => {
      console.log('FIXME: `live complete`');
    }).on('error', (err) => {
      console.log('FIXME: `live error`: ' + err);
    });
  }
}
