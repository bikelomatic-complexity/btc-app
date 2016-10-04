/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { logout } from '../reducers/account';
import { setDrawer } from '../reducers/btc-drawer';

// The logout page serves two purposes.
//  1. to let the user they are logged out
//  2. to actually perform the logout action when the page is loaded.
class LogoutPage extends Component {
  componentDidMount() {
    this.props.dispatch( setDrawer( 'Logout' ) );
    this.props.dispatch( logout() );
  }

  render() {
    return (
      <LetterheadPage>
        <Block header='You have successfully logged out.' />
      </LetterheadPage>
      );
  }
}

function mapStateToProps( state ) {
  return {
    account: state.account
  };
}
export default connect( mapStateToProps )( LogoutPage );
