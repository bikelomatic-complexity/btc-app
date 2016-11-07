/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, Dialog, FlatButton, Snackbar } from 'material-ui';

import BtcDrawer from '../containers/btc-drawer';
import Notifications from '../containers/notifications';
/*eslint-enable no-unused-vars*/

import '../../css/layout.css';

// This component is the root of what the user sees in the browser chrome.
// It contains the drawer, the app bar, and the loaded sub-page.
// Since this component is always loaded, we anchor the dialog and snackbar
// elements here.
//
// If you are looking for the react router, that is in app.js, the entry point
// of our application.
//
// The main component is not connected. This ensures separation of concerns
// in relation to component updates.
export class App extends Component {
  render() {
    const page = React.Children.only( this.props.children );

    return (
      <div className='layout'>
        <BtcDrawer />
        { page }
        <Notifications />
      </div>
      );
  }
}

export default App;
