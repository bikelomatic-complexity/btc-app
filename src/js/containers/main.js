/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, Dialog, FlatButton, Snackbar } from 'material-ui';
import bowser from 'bowser';
import { connect } from 'react-redux';

import BtcDrawer from '../containers/btc-drawer';
import Notifications from '../containers/notifications';
import { setSnackbar } from '../reducers/notifications/snackbar';
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
    const unsupportedMessage = 'Your browser version is not supported.';
    const delayTime = 500;
    const tempMessage = ("Name: " + bowser.name + " Version: " + bowser.version);
    console.log(tempMessage);
    switch(bowser.name){
      case "Android":
        if (bowser.isUnsupportedBrowser({android: "4.4"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "iOS":
        if (bowser.isUnsupportedBrowser({ios: "9.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "Chrome":
        if (bowser.isUnsupportedBrowser({chrome: "49.0"}, window.navigator.userAgent)) {
          this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "Firefox":
        if (bowser.isUnsupportedBrowser({firefox: "49.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
         break;
      case "IE":
        if (bowser.isUnsupportedBrowser({msie: "11.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "Edge":
        if (bowser.isUnsupportedBrowser({edge: "13.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "Safari":
        if (bowser.isUnsupportedBrowser({safari: "9.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      case "Opera":
        if (bowser.isUnsupportedBrowser({opera: "40.0"}, window.navigator.userAgent)) {
           this.props.dispatch( setSnackbar( { message: unsupportedMessage }, delayTime ) );
        }
        break;
      default:
         this.props.dispatch( setSnackbar( { message: 'We can not determine your browser version. This may affect some features.' }, delayTime ) );
        break;
    }

    return (
      <div className='layout'>
        <BtcDrawer />
        { page }
        <Notifications />
      </div>
      );
  }
}

function select( state ) {
  return {

  };
}

export default connect( select )( App );
