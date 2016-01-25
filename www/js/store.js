import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import BlobUtil from 'blob-util'

import {ADD_POINT} from './actions/point-actions'
import {marker} from './reducers/marker'
import {points} from './reducers/points'
import network from './reducers/network'
import tracks from './reducers/tracks'
import settings from './reducers/settings'
import { mapState } from './reducers/map';
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

      let newPoint = Object.assign(action.point, attachmentObject);

      db.post(newPoint).then(response => {
        if (action.imageBlob !== '') {
          const imageSrc = BlobUtil.createObjectURL(action.imageBlob);
          newPoint = Object.assign(newPoint, {imageSrc});
        }
        action.point = Object.assign(newPoint,
          {
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
  points,
  network,
  tracks,
  settings,
  mapState
});

const finalCreateStore = compose(
  applyMiddleware(persister, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export function createAppStore(initState) {
  return finalCreateStore(app, initState);
}
