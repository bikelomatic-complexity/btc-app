
import { fromJS } from 'immutable'
const ONLINE_MODE = 'pannier/settings/ONLINE_MODE';

/**
 * TODO: Investigate performance hit of loading waypoints JSON into
 * the Immutable data structure
 */
const initState = fromJS({
  onlineMode: true
});

export default function reducer(state = initState, action) {
  // console.log('reducer' + state);
  switch(action.type) {
    case ONLINE_MODE:
      return state.set('onlineMode', action.onlineMode);
    default:
      return state;
  }
}

export function setOnlineMode(onlineMode) {
  return { type: ONLINE_MODE, onlineMode };
}
