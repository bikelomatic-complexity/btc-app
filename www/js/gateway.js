import PouchDB from 'pouchdb'

// import library for handling image blobs
import BlobUtil from 'blob-util'

import { USER_ADD_POINT } from './actions/point-actions'
import { pointToDoc, docToPoint } from './reducers/points'
import { bindAll, omit } from 'underscore'

export default class Gateway {

  constructor(db) {
    this.db = db;

    bindAll(this, 'getMiddleware');
  }

  getPouch() {
    return this.db;
  }

  allDocsByClass(cls) {
    return this.db.allDocs({
      include_docs: true,
      attachments: true,
      binary: true,
      startkey: cls,
      endkey: cls + '\uffff'
    });
  }

  getPoints() {
    return this.allDocsByClass('point').then(response => {
      return response.rows.map(row => docToPoint(row.doc));
    });
  }

  getMiddleware() {
    return store => next => action => {
      switch(action.type) {
        case USER_ADD_POINT:

          const doc = pointToDoc(action.point);

          this.db.post(doc).then(response => {
            action.point = Object.assign(action.point, {
              _rev: response.rev
            });
          }).catch(err => {
            console.error(err);
          }).then(() => {
            next(action);
          });

          break;
        default:
          next(action);
      }
    }
  }

}
