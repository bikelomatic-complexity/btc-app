import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'underscore';

import { RaisedButton, TextField, Paper } from 'material-ui';
import { setDrawer } from '../reducers/drawer';
import { register } from '../reducers/account';

class RegisterPage extends Component {

  constructor(props) {
    super(props);
    bindAll( this, 'onRegister' );
  }

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Register');
  }

  onCancel(e) {
    e.preventDefault();

    this.props.history.pushState(null, 'login');
  }

  onRegister(e) {
    const attrs = ['email', 'password', 'username', 'first', 'last'];
    const args = attrs.map(attr => this.refs[attr].getValue());
    console.log(args);

    this.props.dispatch( register.apply( {}, args ) );
  }

  render() {
    const logo = {
      maxWidth: '75%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 25,
      marginBottom: 25
    }

    const border = {
      margin: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const page = {
      flexGrow: 1,
      maxWidth: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    };

    const block = {
      width: '100%',
      padding: 15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const login = {
      marginTop: 20,
      width: '100%'
    };

    const options = {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#B3B3B3'
    }

    return (
      <div style={border}>
        <div style={page}>
          <img style={logo} src="./img/advc-big.jpg" />
          <Paper style={block} zDepth={2}>
            <p>{"Sign up for a Bicycle Touring Companion account"}</p>
            <TextField hintText="Email"
              underlineShow={true}
              fullWidth={true}
              ref="email" />
            <TextField hintText="Password"
              underlineShow={true}
              fullWidth={true}
              ref="password"
              type="password" />
            <TextField hintText="First name"
              underlineShow={true}
              fullWidth={true}
              ref="first" />
            <TextField hintText="Last name"
              underlineShow={true}
              fullWidth={true}
              ref="last" />
            <TextField hintText="Username"
              underlineShow={true}
              fullWidth={true}
              ref="username" />
            <RaisedButton style={login}
              secondary
              onClick={this.onRegister}>
              Sign up
            </RaisedButton>
          </Paper>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    account: state.account
  }
}
export default connect( select )( RegisterPage );
