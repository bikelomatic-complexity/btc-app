import React, {Component} from 'react';
import { CardText, Switch } from 'react-mdl';

export class SettingSwitch extends Component {

  render() {
    const titleStyle = {
      fontSize: '1.8em',
      fontWeight: 'bold',
      paddingBottom: '8px'
    }

    const textStyle = {
      flex: 5,
      padding: '12px',
      paddingTop: '0px'
    }
    return (
      <div className={this.props.className}>
        <CardText style={titleStyle}>
          { this.props.title }
        </CardText>
        <div className="form-row">
          <CardText style={textStyle}>
            { this.props.children }
          </CardText>
          <Switch id={this.props.id} onChange={this.props.onChange}
          checked={this.props.checked}/>
        </div>
      </div>
    )
  }
}

export default SettingSwitch;
