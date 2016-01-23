
import { fromJS } from 'immutable'
import usbr20 from '../usbr20.json'

import {
  MBTILES_SERVER,
  MBTILES_SERVER_ROOT,
  MBTILES_LOCAL_ROOT
} from '../config'

const FETCH = 'pannier/tracks/FETCH';
const REQUEST = 'pannier/tracks/REQUEST';
const RECEIVE = 'pannier/tracks/RECEIVE';
const CLEAR = 'pannier/tracks/CLEAR';
const ACTIVATE = 'pannier/tracks/ACTIVATE';
const DEACTIVATE = 'pannier/tracks/DEACTIVATE';

/**
 * TODO: Investigate performance hit of loading waypoints JSON into
 * the Immutable data structure
 */
const initState = fromJS({
  'usbr-20': {
    _id: 'usbr-20',
    name: 'USBR 20',
    number: 20,
    description: 'This route begins in Luddington, MI and ends near Detroit in Marine City, MI.',
    pkg: 'usbr20.mbtiles',
    status: 'absent',
    isFetching: false,
    active: false,
    sizeMiB: 4.7,
    sha256: null,
    waypoints: usbr20 // See above
  },
  'usbr-1': {
    _id: 'usbr-1',
    name: 'USBR 1',
    number: 20,
    description: 'This route travels up to Bar Harbor.',
    pkg: 'usbr20.mbtiles',
    status: 'absent',
    isFetching: false,
    active: false,
    sizeMiB: 4.7,
    sha256: null,
    waypoints: usbr20 // See above
  }
});

export default function reducer(state = initState, action) {
  // console.log('reducer' + state);
  switch(action.type) {
    case REQUEST:
      return state.mergeDeepIn([action.id], {
        isFetching: action.progress
      });
    case RECEIVE:
      return state.mergeDeepIn([action.id], {
        isFetching: false,
        status: action.status,
      });
    case CLEAR:
      return state.mergeDeepIn([action.id], {
        status: 'absent'
      });
    case DEACTIVATE:
      return state.mergeDeepIn([action.id], {
        active: false
      });
    case ACTIVATE:
      return state.mergeDeepIn([action.id], {
        active: true
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
        // console.log(`beginning download of ${source}`);
        resolve(entry);
      }, error => {
        console.error(`fetch error code ${error.code}`);
        reject(error);
      },
      true);
      let last = 0.0;
      transfer.onprogress = e => {
        if(e.lengthComputable) {
          const fract = e.loaded / e.total;
          if(fract >= last) {
            last = last + 0.1;
            dispatch(requestTrack(id, fract));
          }
        } else {
          dispatch(requestTrack(id, true));
        }
      };
    }).then(entry => {
      dispatch(receiveTrack(id, 'available'));
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

export function clearTrack(id) {
  console.log('FIXME `clearTrack: remove associated mbtiles pkg`');
  return { type: CLEAR, id };
}

export function activateTrack(id) {
  return { type: ACTIVATE, id };
}

export function deactivateTrack(id) {
  return { type: DEACTIVATE, id };
}
