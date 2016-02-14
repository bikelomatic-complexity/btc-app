import React, {Component} from 'react';
import { CardText, Toggle } from 'material-ui';

export class SettingSwitch extends Component {

  render() {
    const titleStyle = {
      fontSize: '1.8em',
      fontWeight: 'bold',
      paddingBottom: '8px'
    }

    return (
      <div className={this.props.className}>
        <CardText style={titleStyle}>
          { this.props.title }
        </CardText>
        <Toggle
          id={this.props.id}
          label={this.props.children}
          style={{marginBottom:16}}
          onToggle={this.props.onChange}
          toggled={this.props.checked}
        />
      </div>
    )
  }
}

export default SettingSwitch;
