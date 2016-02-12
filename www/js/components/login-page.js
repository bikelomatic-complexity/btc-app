import React, {Component} from 'react';

import { Layout, Header, CardText, Textfield } from 'react-mdl';
import { RaisedButton } from 'material-ui';
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
        <Header title="Login"/>
        <ACDrawer page="Login"/>
        <div className="form-column">
          <img style={imgStyle} src="./img/advc.png"/>
          <div>
            <div className="form-row">
              <Textfield label="Email..."/>
            </div>
            <div className="form-row">
              <Textfield type="password" label="Password"/>
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
