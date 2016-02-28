/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { logout } from '../reducers/account';

class LogoutPage extends Component {
  componentDidMount() {
    this.props.setDrawer( 'Logout' );
    this.props.dispatch( logout() );
  }

  render() {
    return (
      <LetterheadPage>
        <Block header="You have successfully logged out." />
      </LetterheadPage>
      );
  }
}

function select( state ) {
  return {
    account: state.account
  };
}
export default connect( select )( LogoutPage );
