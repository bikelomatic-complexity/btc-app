import { Agent } from '../util/agent';
import Device from '../util/device';

import { bindAll } from 'underscore';

export const CONNECTION = 'pannier/network/CONNECTION';

const initState = {
  online: false,
  onMobileData: false
};

export default function reducer( state = initState, action ) {
  switch ( action.type ) {
  case CONNECTION:
    return Object.assign( {}, state, action.status );
  default:
    return state;
  }
}

/**
 * Sets the network connection type with the provided status enum
 */
export function setConnection( status ) {
  return { type: CONNECTION, status };
}

/**
 * Monitors document connection events and dispatches actions to bring the
 * the store up to date with the latest network information. The
 * NetworkManager intelligently cleans connection information, since the
 * cordova plugin has many quirks to work around.
 */
export class NetworkStateAgent extends Agent {
  constructor( store ) {
    super();
    this.store = store;
    this.device = Device.getDevice();

    bindAll( this, 'update' );
  }

  run() {
    document.addEventListener( 'online', this.update );
    document.addEventListener( 'offline', this.update );
    document.addEventListener( 'resume', this.update );

    this.update();
  }

  update() {
    const connection = navigator.connection.type;

    this.store.dispatch( setConnection( {
      isOnline: this.device.isOnline( connection ),
      isOnMobileData: this.device.isOnMobileData( connection )
    } ) );
  }
}
