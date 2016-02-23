import React from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'underscore';
import { RaisedButton, TextField, CardText, Divider, Paper } from 'material-ui';
import { Link } from 'react-router';

import { login } from '../reducers/account';

const styles = {
  logo: {
    maxWidth: '75%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    marginBottom: 25
  },
  border: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  page: {
    flexGrow: 1,
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  block: {
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%'
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#B3B3B3'
  }
};

class LoginPage extends React.Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onLogin' );
  }

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Login' );
  }

  onLogin() {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();

    this.props.dispatch( login( email, password ) ).then( ( ) => {
      this.props.history.push( '/' );
    } );
  }

  render() {
    return (
      <div style={ styles.border }>
        <div style={ styles.page }>
          <img style={ styles.logo } src="./img/advc-big.jpg" />
          <Paper style={ styles.block } zDepth={ 2 }>
            <TextField hintText="Email"
              underlineShow={ true }
              fullWidth={ true }
              ref="email" />
            <TextField hintText="Password"
              underlineShow={ true }
              fullWidth={ true }
              ref="password"
              type="password" />
            <RaisedButton style={ styles.login }
              secondary
              onClick={ this.onLogin }>
              Log In
            </RaisedButton>
            <div style={ styles.options }>
              <p>
                <Link to="register"> Sign Up
                </Link> for Adventure Cycling
              </p>
              <p>
                Forgot password?
              </p>
            </div>
          </Paper>
        </div>
      </div>
      );
  }
}

function select( state ) {
  return {
    account: state.account
  };
}
export default connect( select )( LoginPage );
