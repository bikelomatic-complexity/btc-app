import React, {Component} from 'react';

import { Layout, CardText } from 'react-mdl';
import { RaisedButton, TextField } from 'material-ui';
import { Link } from 'react-router';
import ACDrawer from './ac-drawer';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imgStyle = {
      maxHeight: '150px',
      display: 'block',
      margin: 'auto'
    }
    const centerText = {
      textAlign: 'center'
    }
    return (
      <Layout fixedHeader>
        <ACDrawer history={this.props.history} page="Login"/>
        <div className="form-column">
          <img style={imgStyle} src="./img/advc.png"/>
          <div>
            <div className="form-row">
              <TextField floatingLabelText="Email..."/>
            </div>
            <div className="form-row">
              <TextField type="password" floatingLabelText="Password"/>
            </div>
            <div className="form-row">
              <RaisedButton secondary> Log In </RaisedButton>
            </div>
            <div className="form-row">
              <div style={centerText}>
                <CardText>
                  <Link to="register">Sign Up</Link> for Adventure Cycling
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

export default LoginPage;
