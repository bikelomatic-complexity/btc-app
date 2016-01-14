import React, {Component} from 'react';

import { Layout, Header, Content, CardText, ProgressBar, Button } from 'react-mdl';
import DeviceStorage from './device-storage';
import ACDrawer from './ac-drawer';

class DownloadTrackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {'tracks':{
      1: { name:'Track 01', description:'This track is so excellent!', url:'', downloadSize:35210000, downloading:false, downloaded:0, subtracks: [1,2]},
      2: { name:'Track 02', description:'This track is so excellent!', url:'', downloadSize:25340500, downloading:false, downloaded:0 },
      3: { name:'Track 03', description:'This track is so excellent!', url:'', downloadSize:26467100, downloading:false, downloaded:0 },
      4: { name:'Track 04', description:'This track is so excellent!', url:'', downloadSize:35210000, downloading:false, downloaded:0, subtracks: [5,6]},
      5: { name:'Track 05', description:'This track is so excellent!', url:'', downloadSize:25340510, downloading:false, downloaded:0 },
      6: { name:'Track 06', description:'This track is so excellent!', url:'', downloadSize:26467100, downloading:false, downloaded:0 }
    }}
  }

  saveTrack(trackId) {
    // mock saving
    let modTracks = this.state.tracks;
    modTracks[trackId].downloading = true;
    let saving = setInterval(()=>{
      if (modTracks[trackId].downloaded >= modTracks[trackId].downloadSize || (!modTracks[trackId].downloading)) {
        modTracks[trackId].downloading = false;
        this.setState({'tracks': modTracks});
        clearInterval(saving);
      } else {
        modTracks[trackId].downloaded = modTracks[trackId].downloaded + (modTracks[trackId].downloadSize / 300);
        modTracks[trackId].downloading = true;
        this.setState({'tracks': modTracks});
      }
    }, 50);
  }

  cancelTrack(trackId) {
    let tracks = this.state.tracks;
    tracks[trackId].downloading = false;
    this.setState(tracks);
    this.removeTrack(trackId);
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
    else if (updateString == "Cancel") {
      this.cancelTrack(trackId);
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
        downloadButtonText = "Cancel";
      }
      if (track.downloaded >= track.downloadSize){
        downloadButtonText = "Remove";
      }
      const isSave = downloadButtonText == "Save";
      return (<div className="form-column">
        <div className="form-row">
          <CardText> {track.name} </CardText>
          <Button primary={isSave} accent={!isSave} raised
                  onClick={this.trackDownload.bind(this,downloadButtonText,trackId)}>
              { `${downloadButtonText} (${(track.downloadSize / 1000000).toFixed(0)}MB)` }
          </Button>
        </div>
        <div className="form-row">
          { progressBar }
        </div>
      </div>);
    });
    return (
      <Layout fixedHeader>
        <Header title="Save Track to Phone"/>
        <ACDrawer page="Download Tracks"/>
        <DeviceStorage/>
        { tracks }
      </Layout>
    );
  }
}

export default DownloadTrackPage;
