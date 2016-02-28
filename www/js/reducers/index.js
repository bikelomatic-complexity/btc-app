
import { combineReducers } from 'redux';

import marker from './marker';
import points from './points';
import network from './network';
import tracks from './tracks';
import settings from './settings';
import mapState from './map';
import filters from './filter';
import newPoint from './new-point';
import account from './account';
import drawer from './drawer';
import dialog from './dialog';

const reducers = {
  marker: marker,
  points: points,
  network: network,
  tracks: tracks,
  settings: settings,
  mapState: mapState,
  filters: filters,
  newPoint: newPoint,
  account: account,
  drawer: drawer,
  dialog: dialog
};

export default combineReducers( reducers );
