import React, {Component} from 'react';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';
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
      <div>
        <Layout fixedHeader>
          <Header title="Register New Account"/>
          <ACDrawer page="Login"/>
          <div className="form-column">
            <div className="form-row">
              <Textfield label="Email..."/>
            </div>
            <div className="form-row">
              <Textfield label="First Name"/>
            </div>
            <div className="form-row">
              <Textfield label="Last Name"/>
            </div>
            <div className="form-row">
            <Textfield label="Username"/>
            </div>
            <div className="form-row">
              <Textfield type="password" label="Password"/>
            </div>
            <div className="form-row">
              <Textfield type="password" label="Confirm Password"/>
            </div>
            <div className="form-row">
              <Button colored raised>Submit</Button>
              <Button raised onClick={this.onCancel.bind(this)}>
                Cancel
              </Button>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default RegisterPage;
