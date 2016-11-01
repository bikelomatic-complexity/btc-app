// These React components are rendered with JSX tags, so the linter can't
// detect them.

/*eslint-disable no-unused-vars*/
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
/*eslint-enable no-unused-vars*/

import ReactDOM from 'react-dom';

// The React components below are inserted by the React router
import Main from './containers/main';

import MapPage from './containers/map-page';
import ListPage from './containers/list-page';
import LoginPage from './containers/login-page';
import LogoutPage from './containers/logout-page';
import RegisterPage from './containers/register-page';
import ForgotPasswordPage from './containers/forgot-password-page';
import ResetPasswordPage from './containers/reset-password-page';
import ThanksPageForgotPassword from './containers/thanks-page-forgot-password';
import ThanksPage from './containers/thanks-page';
import DownloadTrackPage from './containers/download-track-page';
import FilterPage from './containers/filter-page';
import SettingsPage from './containers/settings-page';
import PublishPage from './containers/publish-page';

import AddServicePage from './containers/wizard/add-service-page';
import UpdateServicePage from './containers/wizard/update-service-page';
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

// A hash-based history module for use with the react router
import history from './history';

// Import the database (which implicitly connects our models)
import './database';
import store from './store';

// These allow us to automatically handle network state changes and to
// maintain the period of replication.
import { NetworkStateAgent } from './reducers/network';
import { ReplicationAgent, reloadPoints } from './reducers/points';

// Fix tap events so material-ui components work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// When Cordova has loaded, assemble the application components and start them.
//
//  2. Start the NetworkStateAgent and ReplicationAgent
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
    <MuiThemeProvider>
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
            <Route path="publish"
              component={ PublishPage } />
            <Route path="login"
              component={ LoginPage } />
            <Route path="register"
              component={ RegisterPage } />
            <Route path="forgotPassword"
              component={ ForgotPasswordPage } />
            <Route path="resetPassword"
              component={ ResetPasswordPage } />
            <Route path="logout"
              component={ LogoutPage } />
            <Route path="thanksForgotPassword"
              component={ ThanksPageForgotPassword } />
            <Route path="thanks"
              component={ ThanksPage } />
            <Route path="add-service"
              component={ AddServicePage }>
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
            <Route path="/update-service/:id"
              component={ UpdateServicePage }>
              <IndexRoute component={ ServiceName } />
              <Route path="name"
                component={ ServiceName } />
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
    </MuiThemeProvider>
    ), document.getElementById( 'main' ) );
} );
