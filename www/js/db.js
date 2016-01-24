import PouchDB from 'pouchdb'

// import library for handling image blobs
import BlobUtil from 'blob-util'

export const db = new PouchDB('points');
const remote = new PouchDB('http://52.21.125.160:5984/points');
window.db = db;

const points = {
  _id: '_design/points',
  views: {
    points: {
      map: function map(doc) {
        if(doc.name && doc.type && (doc.type === "service" || doc.type === "alert")) {
          emit(doc.name);
        }
      }.toString()
    }
  }
};

export const loadDb = db.put(points).catch(err => {
  if(err.status !== 409) {
    throw err;
  }
  // ignore if doc already exists
}).then(() => {
  return db.replicate.from(remote);
}).catch(err => {
  console.error(err);
}).then(() => {
  return db.query('points', {
    include_docs: true,
    attachments: true,
    binary: true
  });
}).then(response => {
  return response.rows.map(row => {
    let result = row.doc;
    if (row.doc._attachments) {
      const imageBlob = row.doc._attachments['cover.png'].data;
      const imageSrc = BlobUtil.createObjectURL(imageBlob);
      
      result = Object.assign(row.doc, {imageSrc})
    }
    return result;
  });
});
