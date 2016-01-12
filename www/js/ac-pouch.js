import PouchDB from 'pouchdb';

const server = '54.88.14.198';
const port = '5984';

export class ACPouch {
  getPoints() {
    return new PouchDB(`http://${server}:${port}/points`);
  }
}

export default ACPouch;
