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
import DownloadTrackPage from './components/download-track-page';

import rest from 'rest';
import mime from 'rest/interceptor/mime';

/**
 * @type {string} - server ip address
 */
const server = '52.3.244.0';

/**
 * the App component fetches service data from the server and displays
 * a map with points for each service. Fetching hapens upon mount.
 */
class App extends React.Component {
  /**
   * initialize state with mock service data.
   *
   * @param {string} props - react props
   */
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const client = rest.wrap(mime);
    client({path: 'http://' + server + '/services'}).then(response => {
      switch (response.status.code) {
        case 200:
          this.setState({services: response.entity});
          break;
        default:
          console.error('Could not load services');
      }
    });
  }
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
          <Route path="/download-track" component={DownloadTrackPage}/>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('main'));
}, false);
