import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'underscore';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';
import { register } from '../reducers/account';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    bindAll( this, 'onCancel', 'onChange', 'handleRegister');

    this.state = {
      email: '',
      password: '',
      username: '',
      first: '',
      last: ''
    }
  }

  onCancel(e) {
    e.preventDefault();

    this.props.history.pushState(null, 'login');
  }

  handleRegister(e) {
    const { email, password, username, first, last } = this.state;
    this.props.dispatch( register( email, password, username, first, last ) );
  }

  onChange(attr) {
    return function(change) {
      this.setState( { [attr]: change } );
    }.bind(this);
  }

  render() {
    return (
      <Layout fixedHeader>
        <Header title="Register New Account"/>
        <ACDrawer page="Login"/>
        <div className="form-column">
          <div className="form-row">
            <Textfield ref="email"
              onChange={this.onChange('email')}
              value={this.state.email}
              label="Email..."/>
          </div>
          <div className="form-row">
            <Textfield
              onChange={this.onChange('first')}
              value={this.state.first}
              label="First Name"/>
          </div>
          <div className="form-row">
            <Textfield
              onChange={this.onChange('last')}
              value={this.state.last}
              label="Last Name"/>
          </div>
          <div className="form-row">
            <Textfield
              onChange={this.onChange('username')}
              value={this.state.username}
              label="Username"/>
          </div>
          <div className="form-row">
            <Textfield
              onChange={this.onChange('password')}
              value={this.state.password}
              type="password"
              label="Password"/>
          </div>
          <div className="form-row">
            <Textfield type="password" label="Confirm Password"/>
          </div>
          <div className="form-row">
            <Button raised onClick={this.onCancel}>
              Cancel
            </Button>
            <Button colored raised onClick={this.handleRegister}>Submit</Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect()(RegisterPage);
