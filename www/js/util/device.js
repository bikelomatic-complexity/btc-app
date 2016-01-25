
import { contains } from 'underscore'

export default class Device {
  static getDevice() {
    switch(device.platform) {
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

  isOnline(connection) {
    return false;
  }
  isOnMobileData(connection) {
    return false;
  }
}

class AndroidDevice extends Device {
  isOnline(connection) {
    return connection !== Connection.UNKNOWN;
  }
  isOnMobileData(connection) {
    return contains([
      Connection.CELL_2G,
      Connection.CELL_3G,
      Connection.CELL_4G,
      Connection.CELL
    ], connection);
  }
}

class IOSDevice extends Device {
  isOnline(connection) {
    return connection !== Connection.UNKNOWN;
  }
  isOnMobileData(connection) {
    return contains([
      Connection.CELL_2G,
      Connection.CELL_3G,
      Connection.CELL_4G,
      Connection.CELL
    ], connection);
  }
}

class BrowserDevice extends Device {
  isOnline(connection) {
    return true;
  }
  isOnMobileData(connection) {
    return false;
  }
}
