import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'underscore';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';
import { Link } from 'react-router';

import ACDrawer from './ac-drawer';
import { login } from '../reducers/account';

class LoginPage extends React.Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'handleLogin', 'onEmailUpdate', 'onPasswordUpdate' );
  }

  handleLogin() {
    const {email, password} = this.state;

    // Redirect the user if we successfully log in
    this.props.dispatch( login( email, password ) ).then( ( ) => {
      this.props.history.push( '/' );
    } );
  }

  onEmailUpdate( email ) {
    this.setState( { email } );
  }

  onPasswordUpdate( password ) {
    this.setState( { password } );
  }

  render() {
    const imgStyle = {
      maxHeight: '150px',
      display: 'block',
      margin: 'auto'
    };
    const centerText = {
      textAlign: 'center'
    };
    return (
      <Layout fixedHeader>
        <Header title="Login" />
        <ACDrawer page="Login" />
        <div className="form-column">
          <img style={ imgStyle } src="./img/advc.png" />
          <div>
            <div className="form-row">
              <Textfield onChange={ this.onEmailUpdate } label="Email..." />
            </div>
            <div className="form-row">
              <Textfield onChange={ this.onPasswordUpdate }
                type="password"
                label="Password" />
            </div>
            <div className="form-row">
              <Button raised
                colored
                onClick={ this.handleLogin }>
                Log In
              </Button>
            </div>
            <div className="form-row">
              <div style={ centerText }>
                <CardText>
                  <Link to="register"> Sign Up
                  </Link> for Adventure Cycling
                </CardText>
                <CardText>
                  <a>Forgot Password?</a>
                </CardText>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      );
  }
}

function select( state ) {
  return {
    account: state.account
  };
}
export default connect( select )( LoginPage );
