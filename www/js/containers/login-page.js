import React, {Component} from 'react';

import { RaisedButton, TextField, CardText } from 'material-ui';
import { Link } from 'react-router';

class LoginPage extends Component {

  componentDidMount() {
    const { setDrawer } = this.props;
    setDrawer('Login');
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
      <div className="form-column page-content">
        <img style={imgStyle} src="./img/advc.png"/>
        <div>
          <div className="form-row">
            <TextField floatingLabelText="Email..."/>
          </div>
          <div className="form-row">
            <TextField type="password" floatingLabelText="Password"/>
          </div>
          <div className="form-row">
            <RaisedButton secondary label="Log In"/>
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
    );
  }
}

export default LoginPage;
