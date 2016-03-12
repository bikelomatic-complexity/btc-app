/*global process*/
import PouchDB from 'pouchdb';

/*eslint-disable no-unused-vars*/
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
/*eslint-enable no-unused-vars*/

import history from './history'
import ReactDOM from 'react-dom';

import Main from './containers/main';

import MapPage from './containers/map-page';
import LoginPage from './containers/login-page';
import LogoutPage from './containers/logout-page';
import RegisterPage from './containers/register-page';
import ThanksPage from './containers/thanks-page';
import DownloadTrackPage from './containers/download-track-page';
import FilterPage from './containers/filter-page';
import SettingsPage from './containers/settings-page';

import AddPointPage from './containers/wizard/add-point-page';
import UpdatePointPage from './containers/wizard/update-point-page';

import PointLocation from './components/wizard/add-point-location';
import PointName from './components/wizard/add-point-name';
import PointDescription from './components/wizard/add-point-description';
import PointHours from './components/wizard/add-point-hours';
import PointAmenities from './components/wizard/add-point-amenities';

import PeekPointCard from './components/point-card/peek-point-card';
import ViewPointCard from './components/point-card/view-point-card';
import RatingPointCard from './components/rating-point-card';

import StoreBuilder from './store';
import Gateway from './gateway';
import Sync from './sync';
import { NetworkManager } from './reducers/network';
import { reloadPoints } from './reducers/points';

import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/material-design-lite/material.css';

import '../css/app.css';
import '../css/mod.css';
import '../css/flex-objects.css';

// this is needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if ( process.env.NODE_ENV === 'development' ) {
  window.PouchDB = PouchDB;
}

const local = new PouchDB( 'stop-here-db' );
const gateway = new Gateway( local );

const storeBuilder = new StoreBuilder( [ gateway.getMiddleware() ] );
const store = storeBuilder.build();

/* Requires cordova.js to already be loaded via <script> */
document.addEventListener( 'deviceReady', ( ) => {

  const network = new NetworkManager( store );
  network.monitor();

  const sync = new Sync( local, gateway, store );
  sync.start();

  gateway.getPoints().then( points => {
    store.dispatch( reloadPoints( points ) );
  } );

  ReactDOM.render( (
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ Main }>
          <Route component={ MapPage }>
            <IndexRoute />
            <Route path="peek-point/:pointId" component={ PeekPointCard } />
            <Route path="view-point/:pointId" component={ ViewPointCard } />
            <Route path="rate-point/:pointId" component={ RatingPointCard } />
          </Route>
          <Route path="settings" component={ SettingsPage } />
          <Route path="login" component={ LoginPage } />
          <Route path="register" component={ RegisterPage } />
          <Route path="logout" component={ LogoutPage } />
          <Route path="thanks" component={ ThanksPage } />
          <Route path="add-point" component={ AddPointPage }>
            <IndexRoute component={ PointLocation } />
            <Route path="location" component={ PointLocation } />
            <Route path="name" component={ PointName } />
            <Route path="description" component={ PointDescription } />
            <Route path="hours" component={ PointHours } />
            <Route path="amenities" component={ PointAmenities } />
          </Route>
          <Route path="/update-point/:pointId" component={ UpdatePointPage }>
            <IndexRoute component={ PointDescription } />
            <Route path="description" component={ PointDescription } />
            <Route path="hours" component={ PointHours } />
            <Route path="amenities" component={ PointAmenities } />
          </Route>
          <Route path="/download-track" component={ DownloadTrackPage } />
          <Route path="/filter" component={ FilterPage } />
        </Route>
      </Router>
    </Provider>
   ), document.getElementById( 'main' ) );
} );
