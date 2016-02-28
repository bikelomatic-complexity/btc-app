
/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import { LetterheadPage } from '../components/page';
import { FormBlock, Block, BlockFooter, errorProps } from '../components/block';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import bindAll from 'lodash/bindAll';

import { login } from '../reducers/account';

const fields = [ {
  name: 'email',
  hint: 'Email'
}, {
  name: 'password',
  hint: 'Password'
} ];

const footer = (
<BlockFooter>
  <span><Link to="register"> Sign up </Link> for the app</span>
  <span><Link to="forgot"> Forgot password? </Link></span>
</BlockFooter>
);

class LoginPage extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onLogin' );
  }

  componentDidMount() {
    this.props.setDrawer( 'Login' );
  }

  onLogin( values ) {
    const {dispatch, history} = this.props;
    dispatch( login( values, ( ) => history.push( '/' ) ) );
  }

  render() {
    const {account} = this.props;
    const {error, validation} = account.login;

    return (
      <LetterheadPage>
        <FormBlock onAction={ this.onLogin }
          { ...errorProps( error, validation ) }
          actionText="Login"
          fields={ fields }
          footer={ footer } />
      </LetterheadPage>
      );
  }
}

function select( state ) {
  return {
    account: state.account
  };
}
export default connect( select )( LoginPage );
