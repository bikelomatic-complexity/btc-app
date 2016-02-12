import React, {Component} from 'react';

import { Layout, Header, CardText } from 'react-mdl';
import { RaisedButton, TextField } from 'material-ui';
import ACDrawer from './ac-drawer';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
  }

  onCancel(e) {
    e.preventDefault();

    this.props.history.pushState(null, 'login');
  }

  render() {
    return (
      <Layout fixedHeader>
        <Header title="Register New Account"/>
        <ACDrawer page="Login"/>
        <div className="form-column">
          <div className="form-row">
            <TextField floatingLabelText="Email..."/>
          </div>
          <div className="form-row">
            <TextField floatingLabelText="First Name"/>
          </div>
          <div className="form-row">
            <TextField floatingLabelText="Last Name"/>
          </div>
          <div className="form-row">
          <TextField floatingLabelText="Username"/>
          </div>
          <div className="form-row">
            <TextField type="password" floatingLabelText="Password"/>
          </div>
          <div className="form-row">
            <TextField type="password" floatingLabelText="Confirm Password"/>
          </div>
          <div className="form-row">
            <RaisedButton onClick={this.onCancel.bind(this)}>
              Cancel
            </RaisedButton>
            <RaisedButton secondary>Submit</RaisedButton>
          </div>
        </div>
      </Layout>
    );
  }
}

export default RegisterPage;
