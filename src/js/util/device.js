/*global Connection device*/
import { contains } from 'underscore';

/**
 * The base device, used for extension by known devices and as the fallback
 * point for uknown devices. If the device is unknown, network connectivity is
 * is always reported as offline.
 *
 * This class requires that `cordova-plugin-network-information` already be
 * loaded.
 */
export default class Device {

  static getDevice() {
    switch ( device.platform ) {
    case 'Android':
      return new AndroidDevice();
    case 'iOS':
      return new IOSDevice();
    case 'browser':
      return new BrowserDevice();
    default:
      return new Device();
    }
  }

  isOnline( connection ) {
    return false;
  }

  isOnMobileData( connection ) {
    return false;
  }

}

/**
 * Android appropriately detects WiFi and mobile data state
 */
class AndroidDevice extends Device {

  isOnline( connection ) {
    return connection !== Connection.UNKNOWN;
  }

  isOnMobileData( connection ) {
    return contains( [
      Connection.CELL_2G,
      Connection.CELL_3G,
      Connection.CELL_4G,
      Connection.CELL
    ], connection );
  }

}

/**
 * With iOS, we cannot tell if our cell connection has data or not.
 */
class IOSDevice extends Device {

  isOnline( connection ) {
    return connection !== Connection.UNKNOWN;
  }

  isOnMobileData( connection ) {
    return contains( [
      Connection.CELL_2G,
      Connection.CELL_3G,
      Connection.CELL_4G,
      Connection.CELL
    ], connection );
  }

}

/**
 * The plugin cannot detect network status on behalf of the browser platform.
 * However, since the project does not require an offline desktop mode, we
 * always report a non-mobile network connection.
 */
class BrowserDevice extends Device {

  isOnline( connection ) {
    return true;
  }

  isOnMobileData( connection ) {
    return false;
  }

}
