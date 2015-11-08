import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import clientApp from './reducers/reducer';

let store = createStore(clientApp);

import MainPage from './components/main-page';

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
    this.state = {
        services: [{
          _id: '0',
          name: 'Rochester Institute of Technology',
          description: 'Rochester Institute of Technology is a private university located within the town of Henrietta in the Rochester, New York metropolitan area. RIT is composed of nine academic colleges, including National Technical Institute for the Deaf.',
          type: 'School',
          lat: 43.0848,
          lon: -77.6744,
          image: 'http://www.usnews.com/img/college-photo_3121._445x280-zmm.JPG'
        },
        {
          _id: '1',
          name: 'University of Rochester',
          description: 'The University of Rochester is a private, nonsectarian, research university in Rochester, New York. The university grants undergraduate and graduate degrees, including doctoral and professional degrees.',
          type: 'School',
          lat: 43.130553,
          lon: -77.626003,
          image: 'https://www.rochester.edu/college/psc/images/bg/background22.jpg'
        }]
      };
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
      <MainPage services={this.state.services} />
    );
  }
}

/* Requires cordova.js to already be loaded via <script> */
document.addEventListener('deviceready', () => {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('main'));
}, false);
