import React, {Component} from 'react';

import { CardText } from 'react-mdl';

export class DeviceStorage extends Component {
  constructor(props) {
    super(props);
    this.state = { free:0 }
  }

  componentDidMount() {
    cordova.exec(
      free => this.setState({free}),
      err => this.setState({free:0}),
      "File", "getFreeDiskSpace", []
    );
  }

  // TODO: Refactor style logic into CSS

  render() {
    return (
      <div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center', 'justifyContent': 'center'}}>
      <div className='device-storage' style={{'margin': '10', 'maxWidth': '750'}}>
        <div style={{ display: 'flex', 'flexDirection': 'row', 'justifyContent': 'flexStart', 'alignItems': 'center', 'marginBottom': '10px'}}>
          <VisualBlock background='#3f51b5' noFlex={true}/>
          <span style={{'marginLeft': '10px', 'marginRight': '10px'}}>Stop Here!</span>
          <VisualBlock background='lightgray' noFlex={true}/>
          <span style={{'marginLeft': '10px', 'marginRight': '10px'}}>Free Space</span>
        </div>
        <div style={{ display: 'flex', 'flexDirection': 'row', 'alignItems': 'center'}}>
          <VisualBlock  background='#3f51b5'
                        flex={this.props.downloaded}
                        noRightMargin />

          <VisualBlock  background='lightgray'
                        flex={this.state.free}
                        noLeftMargin />
        </div>
      </div>
      </div>
    )
  }

  // TODO: Re-enable logic for downloaded vs free space bar

  // render() {
  //   return (
  //     <div>
  //       <div className="form-row">
  //         {/*}<CardText style={{ fontSize:'2em', fontWeight:'bold' }}>
  //           Storage
  //         </CardText>*/}
  //         <div>
  //           <div>
  //             <VisualBlock background='#3f51b5'/> Adventure Cycling
  //             ({ (this.props.downloaded / 1024).toFixed(0) } MB)
  //           </div>
  //           <div>
  //             <VisualBlock background='lightgray'/> Free Space
  //             ({ (this.state.free / 1024).toFixed(0) } MB)
  //           </div>
  //         </div>
  //       </div>
  //       <div className="form-row">
  //         <VisualBlock  background='#3f51b5'
  //                       flex={this.props.downloaded}
  //                       noRightMargin />
  //
  //         <VisualBlock  background='lightgray'
  //                       flex={this.state.free}
  //                       noLeftMargin />
  //       </div>
  //     </div>
  //   );
  // }
}

export class VisualBlock extends Component {
  render() {
    let propStyle = {
      flex: this.props.flex || 1,
      width: this.props.width || '1em',
      height: '1em',
      display: 'inline-block',
      background: this.props.background
    }
    if(this.props.noFlex) {
      propStyle.flex = undefined;
    }
    if (this.props.noRightMargin) {
      propStyle['marginRight'] = '0px !important';
    }
    if (this.props.noLeftMargin) {
      propStyle['marginLeft'] = '0px !important';
    }
    return (
      <span style={propStyle}/>
    );
  }
}

export default DeviceStorage;
