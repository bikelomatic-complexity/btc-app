import React, {Component} from 'react';

import { CardText } from 'react-mdl';

export class DeviceStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {other:'0.25',ac:'0.25',free:'0.5'}
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <CardText style={{fontSize:'2em',fontWeight:'bold'}}>
            Storage
          </CardText>
          <div>
            <div>
              <VisualBlock width='1em' background='gray'/> Other Apps
            </div>
            <div>
              <VisualBlock width='1em' background='#3f51b5'/> Adventure Cycling
            </div>
            <div>
              <VisualBlock width='1em' background='lightgray'/> Free Space
            </div>
          </div>
        </div>
        <div className="form-row">
          <div>
            <VisualBlock  background='gray'
                          width={`${this.state.other*100}%`} />

            <VisualBlock  background='#3f51b5'
                          width={`${this.state.ac*100}%`} />

            <VisualBlock  background='lightgray'
                          width={`${this.state.free*100}%`} />
          </div>
        </div>
      </div>
    );
  }
}

export class VisualBlock extends Component {
  render() {
    let propStyle = {
      width: this.props.width,
      height: '1em',
      display: 'inline-block',
      background: this.props.background
    }
    return (
      <span style={propStyle}/>
    );
  }
}

export default DeviceStorage;
