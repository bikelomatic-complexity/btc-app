import { merge } from 'lodash';

const ONLINE_MODE = 'btc-app/settings/ONLINE_MODE';

const initState = {
  onlineMode: true,
  repIvalM: 10
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case ONLINE_MODE:
    return merge( {}, state, { onlineMode: action.onlineMode } );
  default:
    return state;
  }
}

/*
 * Go into either online or offline mode
 */
export function setOnlineMode( onlineMode ) {
  return { type: ONLINE_MODE, onlineMode };
}
