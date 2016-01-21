import PouchDB from 'pouchdb'
import {bindAll, has} from 'underscore'
import {replicatePoint} from './actions/point-actions'

export default class Sync {

  constructor(local, remote, store, filter) {
    this.local = local;
    this.remote = remote;
    this.store = store;
    this.filter = (doc) => true;

    bindAll(this, 'online', 'offline');
  }

  start() {
    document.addEventListener("online", this.online);
    document.addEventListener("offline", this.offline);

    const connection = navigator.connection.type;
    switch(connection) {
      case Connection.WIFI:
      // case Connection.CELL_2G:
      // case Connection.CELL_3G:
      // case Connection.CELL_4G:
      // case Connection.CELL:
        console.log('ALREADY ONLINE');
        this.sync();
        break;
    }
  }

  online() {
    if(navigator.connection.type !== Connection.UNKNOWN) {
      console.log('GOING ONLINE: ', navigator.connection.type);
      if(this.rep) this.rep.cancel();
      this.sync();
    }
  }

  offline() {
    console.log('GOING OFFLINE: ', navigator.connection.type);
    if(this.rep) this.rep.cancel();
  }

  sync() {
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

// pull() {
//   this.rep = PouchDB.replicate(this.remote, this.local, {
//     live: false
//   }).on('change', (info) => {
//     const [doc, ...others] = info.docs;
//     if(doc.class === "service") {
//       if(filter(doc)) {
//         store.dispatch(replicatePoint(doc))
//       }
//     }
//   }).on('denied', (info) => {
//     console.log('FIXME: `pull denied`');
//   }).on('complete', (info) => {
//     console.log('FIXME: `pull complete`');
//   }).on('error', (err) => {
//     console.log('FIXME: `pull error`');
//   });
// }
//
// push() {
//   this.rep = PouchDB.replicate(this.local, this.remote, {
//     live: false
//   }).on('change', (info) => {
//     console.log(info);
//   }).on('denied', (info) => {
//     console.log('FIXME: `push denied`');
//   }).on('complete', (info) => {
//     console.log('FIXME: `push complete`');
//   }).on('error', (err) => {
//     console.log('FIXME: `push error`');
//   });
// }
