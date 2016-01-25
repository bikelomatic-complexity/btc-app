
import { fromJS } from 'immutable'

const ONLINE_MODE = 'pannier/settings/ONLINE_MODE';

const initState = fromJS({
  onlineMode: true
});

export default function reducer(state = initState, action) {
  switch(action.type) {
    case ONLINE_MODE:
      return state.set('onlineMode', action.onlineMode);
    default:
      return state;
  }
}

/*
 * Go into either online or offline mode
 */
export function setOnlineMode(onlineMode) {
  return { type: ONLINE_MODE, onlineMode };
}
