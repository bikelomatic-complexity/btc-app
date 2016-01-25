
import { bindAll, contains } from 'underscore'
import Device from '../util/device'

export const CONNECTION = 'pannier/network/CONNECTION'

const initState = {
  online: false,
  onMobileData: false
};

export default function reducer(state = initState, action) {
  switch(action.type) {
    case CONNECTION:
      return Object.assign({}, state, action.status);
    default:
      return state;
  }
}

export function setConnection(status) {
  return { type: CONNECTION, status };
}

export class NetworkManager {

  constructor(store) {
    this.store = store
    this.device = Device.getDevice();

    bindAll(this, 'update');
  }

  monitor() {
    document.addEventListener("online", this.update);
    document.addEventListener("offline", this.update);

    this.update();
  }

  update() {
    const connection = navigator.connection.type;

    this.store.dispatch(setConnection( {
      online: this.device.isOnline(connection),
      onMobileData: this.device.isOnMobileData(connection)
    }));
  }

}
