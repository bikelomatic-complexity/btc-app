
import React, { Component } from 'react';

export default class Service extends Component {
  render() {
    let json = this.props.json;
    return (
      <div className="row">
        <span>{ json.name }</span>
        <span>{ json.type }</span>
        <span>{ json.lat }</span>
        <span>{ json.lon }</span>
      </div>
    );
  }
}
