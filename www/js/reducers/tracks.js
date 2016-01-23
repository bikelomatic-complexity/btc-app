
import { Map } from 'immutable';

import {
  MBTILES_SERVER,
  MBTILES_SERVER_ROOT,
  MBTILES_LOCAL_ROOT
} from '../config'

const FETCH = 'pannier/tracks/FETCH';
const REQUEST = 'pannier/tracks/REQUEST';
const RECEIVE = 'pannier/tracks/RECEIVE';
const ACTIVATE = 'pannier/tracks/ACTIVATE';

const initState = Map();
initState.set('usbr-20', {
  _id: 'usbr-20',
  number: 20,
  pkg: 'usbr20.mbtiles',
  status: 'missing',
  isFetching: false,
  active: false,
  sha256: null
});

export default function reducer(state = initState, action) {
  switch(action.type) {
    case REQUEST:
      return state.mergeIn([action.id], {
        isFetching: action.progress
      });
    case RECEIVE:
      return state.mergeIn([action.id], {
        isFetching: false,
        status: action.status,
      });
    default:
      return state;
  }
}

export function fetchTrack(id, pkg) {
  return dispatch => {

    // Inform app state the track download is starting
    dispatch(requestTrack(id, true));

    const transfer = new FileTransfer();
    const source = encodeURI(`http://${MBTILES_SERVER}/${MBTILES_SERVER_ROOT}/${pkg}`);

    const target = `${MBTILES_LOCAL_ROOT}/${pkg}`;

    return new Promise((resolve, reject) => {
      transfer.download(source, target, entry => {
        console.log(`beginning download of ${source}`);
        resolve(entry);
      }, error => {
        console.error(`fetch error code ${error.code}`);
        reject(error);
      },
      true);
      transfer.onprogress = e => {
        if(e.lengthComputable) {
          dispatch(requestTrack(id, e.loaded / e.total));
        } else {
          dispatch(requestTrack(id, true));
        }
      };
    }).then(entry => {
      dispatch(receiveTrack(id, 'fetched'));
    }).catch(error => {
      dispatch(receiveTrack(id, 'failed'));
    });
  }
}

export function requestTrack(id, progress) {
  // console.log('requestTrack: progress ' + progress * 100);
  return { type: REQUEST, id, progress };
}

export function receiveTrack(id, status) {
  console.log('receiveTrack')
  return { type: RECEIVE, id, status };
}

export function activateTrack(id) {
  return { type: ACTIVATE, id };
}
