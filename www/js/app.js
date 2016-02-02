import PouchDB from 'pouchdb';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import StoreBuilder, { createAppStore } from './store';

import MapPage from './components/map-page';

import AddPointPage from './components/add-point-page';
import AddPointLocation from './components/add-point-location';
import AddPointName from './components/add-point-name';
import AddPointDescription from './components/add-point-description';
import AddPointHours from './components/add-point-hours';
import AddPointAmenities from './components/add-point-amenities';

import RegisterPage from './components/register-page';
import LoginPage from './components/login-page';
import DownloadTrackPage from './components/download-track-page';
import FilterPage from './components/filter-page';
import SettingsPage from './components/settings-page';

import Gateway from './gateway';

import Sync from './sync';
import { NetworkManager } from './reducers/network';

import { reloadPoints } from './reducers/points';

/**
 * the App component fetches service data from the server and displays
 * a map with points for each service. Fetching hapens upon mount.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const local = new PouchDB('stop-here-db');
const gateway = new Gateway(local);

const storeBuilder = new StoreBuilder([ gateway.getMiddleware() ]);
const store = storeBuilder.build();

/* Requires cordova.js to already be loaded via <script> */
document.addEventListener('deviceReady', () => {

  const network = new NetworkManager(store);
  network.monitor();

  const sync = new Sync(local, store);
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
