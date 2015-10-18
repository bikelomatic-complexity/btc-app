import React from 'react';
import ReactDOM from 'react-dom';
import Service from './components/service';

class App extends React.Component {
  render() {
    return (
      <Service />
    );
  }
}

document.addEventListener('deviceready', () => {
  ReactDOM.render((
      <App />
  ), document.getElementById('main'));
}, false);
