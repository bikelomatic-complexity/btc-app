import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import {ADD_POINT} from './actions/point-actions'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import {db, init} from './db'

const persister = store => next => action => {
  switch(action.type) {
    case ADD_POINT:

      // add image attachment to point
      let attachmentObject = {};
      if (action.imageBlob !== '') {
        attachmentObject = {
          _attachments: {
            'cover.png': {
              content_type: 'image/png',
              data: action.imageBlob
            }
          }
        };
      }
      const newPoint = Object.assign(action.point, attachmentObject);

      db.post(newPoint).then(response => {
        action.point = Object.assign(newPoint, {
          _id: response.id,
          _rev: response.rev
        }
      );
      }).catch(err => {
        console.error(err);
      }).then(() => {
        next(action);
      });
      break;
    default:
      next(action);
  }
};

const app = combineReducers({
  marker,
  points
});

const finalCreateStore = compose(
  applyMiddleware(persister),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export function createAppStore(initState) {
  return finalCreateStore(app, initState);
}
