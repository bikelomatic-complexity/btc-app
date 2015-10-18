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

ReactDOM.render((
    <App />
), document.getElementById('main'));
