import React from 'react';
import ReactDOM from 'react-dom';
import Service from './components/service';
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
    let client = rest.wrap(mime);
    client({path: 'localhost:80/services'}).then(
      (response) => {
        this.setState(response);
      },
      (response) => {
        console.error('could not connect to localhost');
      }
    )
  }
  render() {
    let services = this.state.services.map((service) => {
        return (
          <Service key={service.name} json={ service }/>
        );
    });
    return (
      <div className="tbl">{ services }</div>
    );
  }
}

document.addEventListener('deviceready', () => {
  ReactDOM.render((
      <App />
  ), document.getElementById('main'));
}, false);
