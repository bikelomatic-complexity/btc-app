
import { findIndex, omit, has, extend } from 'underscore'

import attach from '../util/attach';

import {
  USER_ADD_POINT,
  USER_UPDATE_POINT,
  USER_RESCIND_POINT,
  SYNC_RECEIVE_POINT,
  SYNC_DELETE_POINT,
  RELOAD_POINTS
} from '../actions/point-actions'

export function points(state = [], action) {
  console.log('DISPATCHING: ' + action.type);
  switch(action.type) {
    case USER_ADD_POINT:
      const newPoint = Object.assign({}, action.point, {coverBlob:action.coverBlob});
      return [
        ...state,
        newPoint
      ];
    case USER_UPDATE_POINT:
      console.log('FIXME: `USER_UPDATE_POINT`');
      return state;
    case USER_RESCIND_POINT:
      console.log('FIXME: `USER_RESCIND_POINT`');
      return state;
    case SYNC_RECEIVE_POINT:
      const recIdx = findIndex(state, point => point._id === action.id);
      if(recIdx === -1) { // Replicated point is new
        return [
          ...state,
          action.point
        ]
      } else { // Replicated point is an edit
        return [
          ...state.slice(0, recIdx),
          action.point,
          ...state.slice(recIdx + 1, state.length)
        ];
      }
    case SYNC_DELETE_POINT:
      const delIdx = findIndex(state, point => point._id === action.id);
      return [
        ...state.slice(0, delIdx),
        ...state.slice(delIdx + 1, state.length)
      ];
    case RELOAD_POINTS:
      return action.points;
    default:
      return state;
  }
}

export function pointToDoc(point) {
  let doc;
  if(point.coverBlob) {
    doc = attach(point, 'cover.png', 'image/png', point.coverBlob);
  } else {
    doc = point;
  }

  return omit(doc, 'coverBlob', 'coverUrl');
}

export function docToPoint(doc) {
  let point;
  if(has(doc, '_attachments') && has(doc['_attachments'], 'cover.png')) {
    point = Object.assign({}, doc, {
      coverBlob: doc['_attachments']['cover.png'].data
    });
  } else {
    point = Object.assign({}, doc)
  }

  return point;
}
