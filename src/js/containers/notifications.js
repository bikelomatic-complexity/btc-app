/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Snackbar } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { bindAll } from 'lodash';
import { connect } from 'react-redux';

import * as actions from '../reducers/notifications';

export class Notifications extends Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div>
        <Snackbar { ...this.props.snackbar }
          onRequestClose={ this.props.closeSnackbar } />
      </div>
      );
  }
}

function select( state ) {
  return {
    dialog: state.notifications.dialog,
    snackbar: state.notifications.snackbar
  };
}
export default connect( select, actions )( Notifications );
