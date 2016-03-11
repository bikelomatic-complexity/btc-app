/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, Dialog, FlatButton, Snackbar } from 'material-ui';

import ACDrawer from '../components/ac-drawer';
import Notifications from '../containers/notifications';
/*eslint-enable no-unused-vars*/

import '../../css/layout.css';

// This component is the root of what the user sees in the browser chrome.
// It contains the drawer, the app bar, and the loaded sub-page.
//
// Since this component is always loaded, we anchor the dialog and snackbar
// elements here.
//
// If you are looking for the react router, that is in app.js, the entry point
// of our application.
export class App extends Component {
  render() {
    const page = React.Children.only( this.props.children );

    return (
      <div className='layout'>
        <ACDrawer />
        { page }
        <Notifications />
      </div>
    );


    // const styles = {
    //   main: {
    //     height: '100%'
    //   },
    //   rest: {
    //     height: 'calc(100% - 64px)',
    //     overflowY: 'auto'
    //   }
    // };
    //
    // return (
    //   <div style={ styles.main }>
    //     <ACDrawer />
    //     <div style={ styles.rest }>
    //       { this.props.children }
    //     </div>
    //     <Notifications />
    //   </div>
    //   );
  }
}

export default App;
