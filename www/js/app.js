import React from 'react';
import ReactDOM from 'react-dom';

import Service from './components/service';
import MyMap from './components/map'

import rest from 'rest';
import mime from 'rest/interceptor/mime';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        services: [ {
          _id: "0",
          name: "Rochester Institute of Technology",
          type: "School",
          lat: 43.0848,
          lon: -77.6744
        } ]
      };
  }
  componentDidMount() {
    const client = rest.wrap(mime);
    client({ path: 'http://52.3.244.0/services' }).then(response => {
      switch(response.status.code) {
        case 200:
          this.setState({services: response.entity});
          break;
        default:
          console.error("Could not load services");
      }
    })
  }
  render() {
    return (
      <MyMap services={this.state.services} />
    )
  }
}

/* Requires cordova.js to already be loaded via <script> */
document.addEventListener('deviceready', () => {
  ReactDOM.render((
      <App />
  ), document.getElementById('main'));
}, false);
