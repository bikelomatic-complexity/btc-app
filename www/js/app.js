import PouchDB from 'pouchdb';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import StoreBuilder, { createAppStore } from './store';

import App from './containers/app';

import MapPage from './containers/map-page';
import AddPointPage from './containers/add-point-page';
import RegisterPage from './containers/register-page';
import LoginPage from './containers/login-page';
import DownloadTrackPage from './containers/download-track-page';
import FilterPage from './containers/filter-page';
import SettingsPage from './containers/settings-page';

import AddPointLocation from './components/add-point-location';
import AddPointName from './components/add-point-name';
import AddPointDescription from './components/add-point-description';
import AddPointHours from './components/add-point-hours';
import AddPointAmenities from './components/add-point-amenities';



import Gateway from './gateway';

import Sync from './sync';
import { NetworkManager } from './reducers/network';

import { reloadPoints } from './reducers/points';

// this is needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

if(process.env.NODE_ENV === 'development') {
  window.PouchDB = PouchDB;
}

const local = new PouchDB('stop-here-db');
const gateway = new Gateway(local);

const storeBuilder = new StoreBuilder([ gateway.getMiddleware() ]);
const store = storeBuilder.build();

/* Requires cordova.js to already be loaded via <script> */
document.addEventListener('deviceReady', () => {

  const network = new NetworkManager(store);
  network.monitor();

  const sync = new Sync(local, gateway, store);
  sync.start();

  gateway.getPoints().then(points => {
    store.dispatch(reloadPoints(points));
  });

  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MapPage}/>
          <Route path="/settings" component={SettingsPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/add-point" component={AddPointPage}>
            <IndexRoute component={AddPointLocation} />
            <Route path="name" component={AddPointName} />
            <Route path="description" component={AddPointDescription} />
            <Route path="hours" component={AddPointHours} />
            <Route path="amenities" component={AddPointAmenities} />
          </Route>
          <Route path="/download-track" component={DownloadTrackPage}/>
          <Route path="/filter" component={FilterPage}/>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('main'));
});
