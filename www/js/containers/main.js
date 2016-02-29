/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import ACDrawer from '../components/ac-drawer';
import { Paper, Dialog, FlatButton, Snackbar } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { setDrawer } from '../reducers/drawer';
import { setDialog, closeDialog, closeSnackbar } from '../reducers/notifications';

// This component is the root of what the user sees in the browser chrome.
// It contains the drawer, the app bar, and the loaded sub-page.
//
// Since this component is always loaded, we anchor the dialog and snackbar
// elements here.
//
// If you are looking for the react router, that is in app.js, the entry point
// of our application.
export class App extends Component {
  onActionTap( tapHandler ) {
    const {dispatch} = this.props;

    if ( tapHandler ) {
      tapHandler();
    }
    dispatch( closeDialog() );
  }

  makeDialogButton( {keyboardFocused, label, primary, secondary, disabled, tapHandler} ) {
    return (
      <FlatButton label={ label }
        keyboardFocused={ keyboardFocused }
        secondary={ secondary }
        primary={ primary }
        disabled={ disabled }
        onTouchTap={ this.onActionTap.bind( this, tapHandler ) } />
      );
  }

  render() {
    const {dispatch} = this.props;

    const childrenWithActions = React.Children.map( this.props.children, child => {
      return React.cloneElement( child, {
        setDrawer: newTitle => {
          dispatch( setDrawer( newTitle ) );
        },
        setDialog: dialog => {
          dispatch( setDialog( dialog ) );
        }
      } );
    } );

    const dialogActions = this.props.dialog.actions.map( button => {
      return this.makeDialogButton( button );
    } );

    return (
      <Paper style={ { height: '100%' } }>
        <ACDrawer history={ this.props.history }
          page={ this.props.drawer }
          account={ this.props.account } />
        <Paper style={ { height: '100%' } }>
          { childrenWithActions }
        </Paper>
        <Dialog { ...this.props.dialog }
          onRequestClose={ this.onActionTap.bind( this ) }
          actions={ dialogActions }>
          { this.props.dialog.description }
        </Dialog>
        <Snackbar { ...this.props.snackbar } onRequestClose={ ( ) => dispatch( closeSnackbar() ) } />
      </Paper>
      );
  }
}

function select( state ) {
  return {
    drawer: state.drawer,
    dialog: state.notifications.dialog,
    snackbar: state.notifications.snackbar,
    account: state.account
  };
}

export default connect( select )( App );
