import React from 'react';
import ReactDOM from 'react-dom';

import Service from './components/service';
import map from './components/map'

import rest from 'rest';
import mime from 'rest/interceptor/mime';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        services: [ {
          name: "Joe's Pizzeria",
          type: "Restaurant",
          lat: "1",
          lon: "1"
        }, {
          name: "Joe's Whisky Bar",
          type: "Bar",
          lat: "1",
          lon: "2"
        } ]
      };
  }
  componentDidMount() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://52.3.244.0/services');
    request.onload = (response) => {
      if(request.status === 200) {
        console.log("what?");
        let json = JSON.parse(request.responseText);
        this.setState({services: json});
      } else {
        console.error('error');
      }
    };
    request.send();

    // let client = rest.wrap(mime);
    // client({path: 'http://52.3.240.0/services'}).then(
    //   (response) => {
    //     console.log('here');
    //     console.log(response);
    //     this.setState({services: response});
    //   },
    //   (response) => {
    //     console.error('could not connect to localhost');
    //   }
    // )
  }
  render() {
    let services = this.state.services.map((service) => {
        return (
          <Service key={service.name} json={ service }/>
        );
    });
    return (
      <div>
        <div className="tbl">
          { services }
        </div>
        { map }
      </div>
    );
  }
}

document.addEventListener('deviceready', () => {
  ReactDOM.render((
      <App />
  ), document.getElementById('main'));
}, false);
