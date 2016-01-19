import React, {Component} from 'react';

import { Layout, Header, Content, CardText, ProgressBar, Button } from 'react-mdl';
import DeviceStorage from './device-storage';
import ACDrawer from './ac-drawer';
import { downloadableTracks } from '../mock-data';

class DownloadTrackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {'tracks':downloadableTracks}
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
    let downloaded = 0;
    const tracks = Object.keys(this.state.tracks).map((trackId)=>{
      let downloadButtonText = "Save";
      let track = this.state.tracks[trackId];
      downloaded += this.state.tracks[trackId].downloaded;
      let progressBar = (
        <ProgressBar progress={(track.downloaded/track.downloadSize) * 100}/>
      )
      if (track.downloading) {
        downloadButtonText = "Cancel";
      }
      if (track.downloaded >= track.downloadSize){
        downloadButtonText = "Remove";
      }
      const isSave = downloadButtonText == "Save";
      return (
        <div key={trackId}>
          <div className="form-row">
            <CardText> {track.name} </CardText>
            <Button primary={isSave} accent={!isSave} raised
                    onClick={
                      this.trackDownload.bind(this,downloadButtonText,trackId)
                    }>
                {downloadButtonText} ({(track.downloadSize/1024).toFixed(0)} MB)
            </Button>
          </div>
          <div className="form-row">
            { progressBar }
          </div>
        </div>
      );
    });

    return (
      <Layout fixedHeader>
        <Header title="Save Track to Phone"/>
        <ACDrawer page="Download Track"/>
        <div className="form-column">
          <DeviceStorage downloaded={downloaded}/>
          { tracks }
        </div>
      </Layout>
    );
  }
}

export default DownloadTrackPage;
