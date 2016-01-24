
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
 * TODO: Obtain tracks from the database
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
    sha256: null, // TODO: implement digest check to verify downloads
    waypoints: usbr20 // See above
  }
});

export default function reducer(state = initState, action) {
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

/*
 * Creates an action thunk to async download mbtiles packages for tracks. The
 * download is performed with the cordova-plugin-file-transfer plugin.
 */
export function fetchTrack(id, pkg) {
  return dispatch => {

    // Inform app state the track download is starting
    dispatch(requestTrack(id, true));

    const transfer = new FileTransfer();
    const source = encodeURI(`http://${MBTILES_SERVER}/${MBTILES_SERVER_ROOT}/${pkg}`);

    const target = `${MBTILES_LOCAL_ROOT}/${pkg}`;

    return new Promise((resolve, reject) => {

      // Use cordova-plugin-file-transfer to initiate the download
      transfer.download(source, target, entry => {
        resolve(entry);
      }, error => {
        console.error(`fetch error code ${error.code}`);
        reject(error);
      },
      true);

      // Only dispatch updates every 10% to improve performance. If we ever
      // cannot determine the size of the download, mark progress as
      // indeterminate.
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

/*
 * Create action to notify store a download has been initiated. This action
 * creator should only be used within fetchTrack.
 *
 * The progress argument can either be true, or a finite number. `true`
 * represents an indeterminate download. When progress is a number, it should
 * be a float between 0.0 and 1.0 representing download progress.
 */
function requestTrack(id, progress) {
  return { type: REQUEST, id, progress };
}

/*
 * Create action to notify store an async track package download has completed.
 * This action creator should only be used within fetchTrack.
 */
function receiveTrack(id, status) {
  return { type: RECEIVE, id, status };
}

/*
 * Create action to clear a downloaded track from memory.
 * TODO: Implement clearTrack.
 */
export function clearTrack(id) {
  console.log('TODO: `clearTrack: remove associated mbtiles pkg`');
  return { type: CLEAR, id };
}

/*
 * Show a track on the map.
 */
export function activateTrack(id) {
  return { type: ACTIVATE, id };
}

/*
 * Hide a track from the map
 */
export function deactivateTrack(id) {
  return { type: DEACTIVATE, id };
}
