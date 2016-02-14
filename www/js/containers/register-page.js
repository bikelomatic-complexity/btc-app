import React, {Component} from 'react';

import { RaisedButton, TextField, CardText } from 'material-ui';
import { setDrawer } from '../reducers/drawer';

class RegisterPage extends Component {

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Register');
  }

  onCancel(e) {
    e.preventDefault();

    this.props.history.pushState(null, 'login');
  }

  render() {
    return (
      <div className="form-column page-content">
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
    );
  }
}

export default RegisterPage;
