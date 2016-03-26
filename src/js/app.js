// These React components are rendered with JSX tags, so the linter can't
// detect them.

/*eslint-disable no-unused-vars*/
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
/*eslint-enable no-unused-vars*/

import ReactDOM from 'react-dom';

// The React components below are inserted by the React router
import Main from './containers/main';

import MapPage from './containers/map-page';
import ListPage from './containers/list-page';
import LoginPage from './containers/login-page';
import LogoutPage from './containers/logout-page';
import RegisterPage from './containers/register-page';
import ThanksPage from './containers/thanks-page';
import DownloadTrackPage from './containers/download-track-page';
import FilterPage from './containers/filter-page';
import SettingsPage from './containers/settings-page';

import AddPointPage from './containers/wizard/add-point-page';
import UpdatePointPage from './containers/wizard/update-point-page';
import AddAlertPage from './containers/wizard/add-alert-page';

import PointLocation from './components/wizard/point-location';
import ServiceName from './components/wizard/service-name';
import ServiceDescription from './components/wizard/service-description';
import ServiceHours from './components/wizard/service-hours';
import ServiceAmenities from './components/wizard/service-amenities';
import AlertNameDescription from './components/wizard/alert-name-description';

import PeekPointCard from './components/point-card/peek-point-card';
import ViewPointCard from './components/point-card/view-point-card';
import RatingPointCard from './components/point-card/rating-point-card';

// Exposes the history object for navigating with the React Router.
// Right now, it's hash based.
import history from './history';

// Allow direct access to the local PouchDB instance and import the gateway
// singleton to make working with the database easier.
import database from './database';
// import gateway from './gateway';
import store from './store';

// Sync and NetworkManager allow us to automatically work with the remote
// PouchDB when the user is online.
import { NetworkStateAgent } from './reducers/network';
// import Sync from './sync';

// Redux action creators used by app.js
import { ReplicationAgent, reloadPoints } from './reducers/points';

// Fix tap events so material-ui components work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// When Cordova has loaded, assemble the application components and start them.
//
//  1. Create the redux store
//  2. Start the NetworkManager to reflect network state in the store
//  3. Start syncing the local PouchDB with the remote CouchDB
//  4. Pull all locally available points into the store
//  5. Start the React Router
//
// In order for this event to be fired, cordova.js must already be loaded via
// a <script> tag. Also, a <div class="main" /> is required in the body. We
// render the application into that div.
document.addEventListener( 'deviceReady', ( ) => {
  const network = new NetworkStateAgent( store );
  network.run();

  const replicator = new ReplicationAgent( store );
  replicator.run();

  store.dispatch( reloadPoints() );

  ReactDOM.render( (
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/"
          component={ Main }>
          <Route component={ MapPage }>
            <IndexRoute />
            <Route path="peek-point/:id"
              component={ PeekPointCard } />
            <Route path="view-point/:id"
              component={ ViewPointCard } />
            <Route path="rate-point/:id"
              component={ RatingPointCard } />
          </Route>
          <Route path="list"
            component={ ListPage } />
          <Route path="settings"
            component={ SettingsPage } />
          <Route path="login"
            component={ LoginPage } />
          <Route path="register"
            component={ RegisterPage } />
          <Route path="logout"
            component={ LogoutPage } />
          <Route path="thanks"
            component={ ThanksPage } />
          <Route path="add-point"
            component={ AddPointPage }>
            <IndexRoute component={ PointLocation } />
            <Route path="location"
              component={ PointLocation } />
            <Route path="name"
              component={ ServiceName } />
            <Route path="description"
              component={ ServiceDescription } />
            <Route path="hours"
              component={ ServiceHours } />
            <Route path="amenities"
              component={ ServiceAmenities } />
          </Route>
          <Route path="/update-point/:id"
            component={ UpdatePointPage }>
            <IndexRoute component={ ServiceDescription } />
            <Route path="description"
              component={ ServiceDescription } />
            <Route path="hours"
              component={ ServiceHours } />
            <Route path="amenities"
              component={ ServiceAmenities } />
          </Route>
          <Route path="add-alert"
            component={ AddAlertPage }>
            <IndexRoute component={ PointLocation } />
            <Route path="location"
              component={ PointLocation } />
            <Route path="name"
              component={ AlertNameDescription } />
          </Route>
          <Route path="/download-track"
            component={ DownloadTrackPage } />
          <Route path="/filter"
            component={ FilterPage } />
        </Route>
      </Router>
    </Provider>
    ), document.getElementById( 'main' ) );
} );
