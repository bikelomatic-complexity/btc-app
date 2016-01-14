import React, {Component} from 'react';

import { Layout, Header, Content, CardText, ProgressBar, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';

class DeviceStorage extends Component {
  constructor(props) {
    super(props);
    this.state = {other:'0.25',ac:'0.25',free:'0.5'}
  }

  makeBlock({width, background, height='1em'}) {
    return (
      <span style={{height,width,display:'inline-block',background}}/>
    );
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <CardText style={{fontSize:'2em',fontWeight:'bold'}}> Storage </CardText>
          <div>
            <div> { this.makeBlock({width:'1em',background:'gray'}) } Other Apps </div>
            <div> { this.makeBlock({width:'1em',background:'#3f51b5'}) } Adventure Cycling </div>
            <div> { this.makeBlock({width:'1em',background:'lightgray'}) }  Free Space </div>
          </div>
        </div>
        <div className="form-row">
          <div>
            { this.makeBlock({background:'gray',width:`${this.state.other*100}%`}) }
            { this.makeBlock({background:'#3f51b5',width:`${this.state.ac*100}%`}) }
            { this.makeBlock({background:'lightgray',width:`${this.state.free*100}%`}) }
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceStorage;
