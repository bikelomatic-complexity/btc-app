import React, {Component} from 'react';

import { Layout, Header, Content, CardText, ProgressBar, Button } from 'react-mdl';
import ACDrawer from './ac-drawer';

class DownloadTrackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {'tracks':{
      1: { name:'track1', url:'', downloadSize:807, downloading:false, downloaded:0, subtracks: [1,2]},
      2: { name:'track2', url:'', downloadSize:255, downloading:false, downloaded:0 },
      3: { name:'track3', url:'', downloadSize:552, downloading:false, downloaded:0 },
      4: { name:'track4', url:'', downloadSize:707, downloading:false, downloaded:0, subtracks: [5,6]},
      5: { name:'track5', url:'', downloadSize:555, downloading:false, downloaded:0 },
      6: { name:'track6', url:'', downloadSize:152, downloading:false, downloaded:0 }
    }}
  }

  saveTrack(trackId) {
    // mock saving
    let modTracks = this.state.tracks;
    modTracks[trackId].downloading = true;
    let saving = setInterval(()=>{
      if (!modTracks[trackId].downloading) {
        clearInterval(saving);
      }
      modTracks[trackId].downloaded++;
      modTracks[trackId].downloading = true;
      this.setState({'tracks': modTracks});
    }, 50);
  }

  stopTrack(trackId) {
    let tracks = this.state.tracks;
    tracks[trackId].downloading = false;
    this.setState(tracks);
  }

  removeTrack(trackId) {
    let tracks = this.state.tracks;
    tracks[trackId].downloaded = 0;
    this.setState(tracks);
  }

  trackDownload(updateString, trackId) {
    if (updateString == "Save") {
      this.saveTrack(trackId);
    }
    else if (updateString == "Stop") {
      this.stopTrack(trackId);
    }
    else if (updateString == "Remove") {
      this.removeTrack(trackId);
    }
  }

  render() {
    const tracks = Object.keys(this.state.tracks).map((trackId)=>{
      let downloadButtonText = "Save";
      let track = this.state.tracks[trackId];
      let progressBar = <ProgressBar progress={(track.downloaded/track.downloadSize) * 100}/>
      if (track.downloading) {
        downloadButtonText = "Stop";
      }
      if (track.downloaded >= track.downloadSize){
        downloadButtonText = "Remove";
      }
      const isSave = downloadButtonText == "Save";
      const isRemove = downloadButtonText == "Remove";
      const isStop = downloadButtonText == "Stop";
      return (<div>
        <CardText> {track.name} </CardText>
        <Button primary={isSave} accent={isRemove || isStop}
                flat={isRemove} raised={isSave || isStop}
                onClick={this.trackDownload.bind(this,downloadButtonText,trackId)}>
            { downloadButtonText }
        </Button>
        { progressBar }
      </div>);
    });
    return (
      <div className="adding-point">
        <Layout fixedHeader>
          <Header title="Save Track to Phone"/>
          <ACDrawer page="Download Tracks"/>
          { tracks }
        </Layout>
      </div>
    );
  }
}

export default DownloadTrackPage;
