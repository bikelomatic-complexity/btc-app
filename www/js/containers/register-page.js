import React from 'react';
import { connect } from 'react-redux';
import { RaisedButton, TextField, Paper } from 'material-ui';
import _, { bindAll } from 'underscore';

import { setDrawer } from '../reducers/drawer';
import { register } from '../reducers/account';

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
    width: '100%'
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#B3B3B3'
  },
  p: {
    marginBottom: 0
  }
};

class RegisterPage extends React.Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onRegister' );
  }

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Register' );
  }

  onCancel( e ) {
    e.preventDefault();

    this.props.history.pushState( null, 'login' );
  }

  // Dispatch a registration request for all registration form fields. The
  // fields are retreived by material-ui ref.
  onRegister( e ) {
    const attrs = [ 'email', 'password', 'username', 'first', 'last' ];
    const args = attrs.map( attr => this.refs[ attr ].getValue() );

    this.props.dispatch( register.apply( this, args ) );
  }

  render() {
    const {account} = this.props;

    let content;
    if ( account.received && !account.registrationError ) {
      content = (
        <Paper style={ styles.block } zDepth={ 2 }>
          <p style={ styles.p }>
            { "Check your inbox for our verification email" }
          </p>
        </Paper>
      );
    } else if ( account.received && account.registrationError ) {
      content = (
        <Paper style={ styles.block } zDepth={ 2 }>
          <p style={ styles.p }>
            { "There were some issues creating your account" }
          </p>
          <p style={ styles.p }>
            { account.registrationError }
          </p>
        </Paper>
      );
    } else {
      const fields = [ {
        hint: 'Email',
        field: 'email',
        type: 'email'
      }, {
        hint: 'Password',
        field: 'password',
        type: 'password'
      }, {
        hint: 'First name',
        field: 'first'
      }, {
        hint: 'Last name',
        field: 'last'
      }, {
        hint: 'Username',
        field: 'username'
      } ].map( f => {
        const error = _.findWhere( account.registrationError, {
          dataPath: '.' + f.field
        } );
        if ( error ) {
          return (
            <TextField hintText={ f.hint }
              underlineShow={ true }
              fullWidth={ true }
              type={ f.type }
              errorText={ error.message }
              ref={ f.field }
              key={ f.field } />
            );
        } else {
          return (
            <TextField hintText={ f.hint }
              underlineShow={ true }
              fullWidth={ true }
              type={ f.type }
              ref={ f.field }
              key={ f.field } />
            );
        }

      } );
      content = (
        <Paper style={ styles.block } zDepth={ 2 }>
          <p style={ styles.p }>
            { "Sign up for a Bicycle Touring Companion account" }
          </p>
          { fields }
          <RaisedButton style={ styles.login }
            secondary
            onClick={ this.onRegister }
            label="Sign Up"/>
        </Paper>
      );
    }

    return (
      <div style={ styles.border }>
        <div style={ styles.page }>
          <img style={ styles.logo } src="./img/advc-big.jpg" />
          { content }
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
export default connect( select )( RegisterPage );
