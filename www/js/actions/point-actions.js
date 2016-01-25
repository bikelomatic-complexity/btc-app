
import { createObjectURL } from 'blob-util';

export const USER_ADD_POINT = 'USER_ADD_POINT';
export function userAddPoint(point, coverBlob) {
  return {
    type: USER_ADD_POINT,
    point: withCover(point, coverBlob)
  };
}

export const USER_RESCIND_POINT = 'DELETE_POINT';
export function userRescindPoint(id) {
  return {
    type: DELETE_POINT,
    id
  };
}

export const USER_UPDATE_POINT = 'USER_UPDATE_POINT';
export function userUpdatePoint(id, point) {
  return {
    type: USER_UPDATE_POINT,
    id,
    point
  };
}

export const SYNC_RECEIVE_POINT = 'SYNC_RECEIVE_POINT';
export function syncRecievePoint(id, point, coverBlob) {
  return {
    type: SYNC_RECEIVE_POINT,
    id,
    point: withCover(point, coverBlob),
  };
}

export const SYNC_DELETE_POINT = 'pannier/points/DELETE';
export function syncDeletePoint(id) {
  return {
    type: SYNC_DELETE_POINT,
    id
  };
}

export const RELOAD_POINTS = 'RESET_POINTS';
export function reloadPoints(points) {
  return {
    type: RELOAD_POINTS,
    points: points.map(point => withCover(point, point.coverBlob))
  };
}

function withCover(point, coverBlob) {
  let withCover;

  if(coverBlob) {
    const coverUrl = createObjectURL(coverBlob);
    withCover = Object.assign({}, point, { coverBlob, coverUrl });
  } else {
    withCover = Object.assign({}, point);
  }

  return withCover;
}
