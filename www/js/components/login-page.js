import React, {Component} from 'react';

import { Layout, Header, CardText, Textfield, Button } from 'react-mdl';
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
    const centerValign = {
      margin: 'auto 0px',
      overflowY: 'scroll'
    }
    const centerText = {
      textAlign: 'center'
    }
    return (
      <div>
        <Layout fixedHeader>
          <Header title="Login"/>
          <ACDrawer page="Login"/>
          <div style={centerValign}>
            <img style={imgStyle} src="./img/advc.png"/>
            <div className="form-column">
              <div className="form-row">
                <Textfield label="Email..."/>
              </div>
              <div className="form-row">
                <Textfield type="password" label="Password"/>
              </div>
              <div className="form-row">
                <Button raised colored> Log In </Button>
              </div>
              <div className="form-row">
                <div style={centerText}>
                  <CardText>
                    <a>Sign Up</a> for Adventure Cycling
                  </CardText>
                  <CardText>
                    <a>Forgot Password?</a>
                  </CardText>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default LoginPage;
