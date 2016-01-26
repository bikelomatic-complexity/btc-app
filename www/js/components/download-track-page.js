import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isFinite } from 'underscore'

import { Switch, Layout, Header, Card, CardActions, CardText, CardTitle, ProgressBar, Button } from 'react-mdl';
import DeviceStorage from './device-storage';
import ACDrawer from './ac-drawer';

import {
  fetchTrack,
  clearTrack,
  activateTrack,
  deactivateTrack
} from '../reducers/tracks'

class DownloadTrackPage extends Component {
  constructor(props) {
    super(props);
  }

  onSaveTrack(id, pkg) {
    this.props.dispatch(fetchTrack(id, pkg));
  }

  onCancelTrack(id) {
    console.log('FIXME: `onCancelTrack`');
  }

  onRemoveTrack(id) {
    this.props.dispatch(clearTrack(id));
  }

  onActivationTrack(id, val) {
    const fn = val ? activateTrack : deactivateTrack;
    this.props.dispatch(fn(id));
  }

  render() {
    const { tracks } = this.props;

    const downloaded = Object.keys(tracks).reduce((pre, cur) => {
      return pre + (tracks[cur].status === 'fetched');
    }, 0);

    const rows = Object.keys(tracks).map(id => {
      const track = tracks[id];

      let progressBar;
      if(track.isFetching === true) {
        progressBar = (
          <ProgressBar indeterminate={true} />
        );
      } else if(isFinite(track.isFetching)) {
        progressBar = (
          <ProgressBar progress={track.isFetching * 100} />
        )
      } else {
      }

      // TODO: Refactor this using O-O principles
      let icon;
      let downloadButtonText;
      let isSave;
      let action;
      if(track.isFetching) {
        downloadButtonText = 'Cancel';
        isSave = false;
        action = this.onCancelTrack.bind(this, id);
        icon = 'cloud_download';
      } else if(track.status === 'available') {
        downloadButtonText = "Remove";
        isSave = false;
        action = this.onRemoveTrack.bind(this, id);
        icon = 'cloud_download';
      } else {
        downloadButtonText = "Save";
        isSave = true;
        action = this.onSaveTrack.bind(this, id, track.pkg);
        icon = 'cloud_download';
      }

      return (
        <Card key={id} className={'track-card'} shadow={3}>
          <CardTitle>{track.name}</CardTitle>
          <CardText>{track.description}</CardText>
          <CardActions border={true}>
            <Button primary={isSave} accent={!isSave} raised onClick={action}>
              <span className='material-icons'>{icon}</span>
              <span className='button-text'>{downloadButtonText}</span>
            </Button>
            
            <span className='size-text'>{`${track.sizeMiB} MiB`}</span>

            <div>
            <Switch id={id} ripple={true} checked={track.active} onChange={this.onActivationTrack.bind(this, id)}/>
            </div>
          </CardActions>
        </Card>
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
