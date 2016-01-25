import PouchDB from 'pouchdb'

// import library for handling image blobs
import BlobUtil from 'blob-util'

export const db = new PouchDB('points');
export const remote = new PouchDB('http://52.21.125.160:5984/points');
window.db = db;

export const loadDb = db.allDocs({
  include_docs: true,
  attachments: true,
  binary: true,
  startkey: 'point/',
  endkey: 'point/\uffff'
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
})
