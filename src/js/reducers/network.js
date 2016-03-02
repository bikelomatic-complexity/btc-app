import { bindAll } from 'underscore';
import Device from '../util/device';

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
export class NetworkManager {

  constructor( store ) {
    this.store = store;
    this.device = Device.getDevice();

    bindAll( this, 'update' );
  }

  monitor() {
    document.addEventListener( 'online', this.update );
    document.addEventListener( 'offline', this.update );

    this.update();
  }

  update() {
    const connection = navigator.connection.type;

    this.store.dispatch( setConnection( {
      online: this.device.isOnline( connection ),
      onMobileData: this.device.isOnMobileData( connection )
    } ) );
  }

}
