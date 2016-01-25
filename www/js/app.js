import React from 'react';
import ReactDOM from 'react-dom';

// redux components
import { Provider } from 'react-redux';

// react-router components
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createAppStore } from './store'

// pages to render for different routes
import MapPage from './components/map-page';
import AddPointPage from './components/add-point-page';
import RegisterPage from './components/register-page';
import LoginPage from './components/login-page';
import DownloadTrackPage from './components/download-track-page';
import FilterPage from './components/filter-page';
import SettingsPage from './components/settings-page';

import {loadDb, db, remote} from './db'

import Sync from './sync'
import { NetworkManager } from './reducers/network'

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

/* Requires cordova.js to already be loaded via <script> */
const deviceReady = new Promise(resolve => {
  document.addEventListener('deviceReady', resolve, false);
});

Promise.all([deviceReady, loadDb]).then( ([device, points]) => {
  const store = createAppStore({points});

  const network = new NetworkManager(store);
  network.monitor();

  const sync = new Sync(db, remote, store);
  sync.start();

  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MapPage}/>
          <Route path="/settings" component={SettingsPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/add-point" component={AddPointPage}/>
          <Route path="/download-track" component={DownloadTrackPage}/>
          <Route path="/filter" component={FilterPage}/>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('main'));
})
