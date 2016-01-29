
import { combineReducers } from 'redux'

import { marker } from './marker'
import points from './points'
import network from './network'
import tracks from './tracks'
import settings from './settings'
import { mapState } from './map'
import { filters } form './filters'

export default combineReducers({
  marker,
  points,
  network,
  tracks,
  settings,
  mapState,
  filters
});
