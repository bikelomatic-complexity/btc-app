import PouchDB from 'pouchdb'
import {bindAll, has} from 'underscore'
import {replicatePoint} from './actions/point-actions'

export default class Sync {

  constructor(local, remote, store, filter) {
    this.local = local;
    this.remote = remote;
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
        const deleted = has(doc, '_deleted');

        if(doc.class === 'service') {
          this.store.dispatch(replicatePoint(doc._id, doc, deleted));
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
