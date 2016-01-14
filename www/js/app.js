import React from 'react';
import ReactDOM from 'react-dom';

// redux components
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import clientApp from './reducers/reducer';

// react-router components
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

let store = createStore(clientApp);

// pages to render for different routes
import MapPage from './components/map-page';
import AddPointPage from './components/add-point-page';

import rest from 'rest';
import mime from 'rest/interceptor/mime';

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
document.addEventListener('deviceready', () => {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={MapPage}/>
          <Route path="/add-point" component={AddPointPage}/>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('main'));
}, false);
