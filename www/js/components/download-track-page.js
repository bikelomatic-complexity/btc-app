import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isFinite, bindAll } from 'underscore'

import { Layout, Header, Content, CardText, ProgressBar, Button } from 'react-mdl';
import DeviceStorage from './device-storage';
import ACDrawer from './ac-drawer';
import { downloadableTracks } from '../mock-data';
import { fetchTrack, clearTrack } from '../reducers/tracks'

class DownloadTrackPage extends Component {
  constructor(props) {
    super(props);
    // this.state = {'tracks':downloadableTracks}
  }

  saveTrack(id, pkg) {
    this.props.dispatch(fetchTrack(id, pkg));
  }

  cancelTrack(id) {
    console.log('FIXME: `cancelTrack`');
  }

  removeTrack(id) {
    this.props.dispatch(clearTrack(id));
  }

  render() {
    const { tracks } = this.props;

    // const tracks = Object.keys(this.state.tracks).map((trackId)=>{
    const downloaded = Object.keys(tracks).reduce((pre, cur) => {
      return pre + (tracks[cur].status === 'fetched');
    }, 0);

    const rows = Object.keys(tracks).map(id => {
      const track = tracks[id];

      let progressBar;
      if(track.isFetching === true) {
        console.log('indeterminate');
        progressBar = (
          <ProgressBar indeterminate={true} />
        );
      } else if(isFinite(track.isFetching)) {
        progressBar = (
          <ProgressBar progress={track.isFetching * 100} />
        )
        console.log('progress');
      } else {
        console.log('nope');
      }

      let downloadButtonText;
      let isSave;
      let action;
      if(track.isFetching) {
        downloadButtonText = 'Cancel';
        isSave = false;
        action = this.cancelTrack.bind(this, id);
      } else if(track.status === 'available') {
        downloadButtonText = "Remove";
        isSave = false;
        action = this.removeTrack.bind(this, id);
      } else {
        downloadButtonText = "Save";
        isSave = true;
        action = this.saveTrack.bind(this, id, track.pkg);
      }

      return (
        <div key={id}>
          <div className="form-row">
            <CardText> {track.name} </CardText>
            <Button primary={isSave} accent={!isSave} raised onClick={action}>
                {`${downloadButtonText} (${track.sizeMiB} MiB)`}
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
          { rows }
        </div>
      </Layout>
    );
  }
}

const select = state => {
  return { tracks: state.tracks.toJS() }
};
export default connect(select)(DownloadTrackPage);
