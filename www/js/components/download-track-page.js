import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isFinite } from 'underscore'

import { Switch, Layout, Header, Content, Card, CardActions, CardText, CardTitle, ProgressBar, Button } from 'react-mdl';
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

  saveTrack(id, pkg) {
    this.props.dispatch(fetchTrack(id, pkg));
  }

  cancelTrack(id) {
    console.log('FIXME: `cancelTrack`');
  }

  removeTrack(id) {
    this.props.dispatch(clearTrack(id));
  }

  activationChange(id, val) {
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
        action = this.cancelTrack.bind(this, id);
        icon = 'cloud_download';
      } else if(track.status === 'available') {
        downloadButtonText = "Remove";
        isSave = false;
        action = this.removeTrack.bind(this, id);
        icon = 'cloud_download';
      } else {
        downloadButtonText = "Save";
        isSave = true;
        action = this.saveTrack.bind(this, id, track.pkg);
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

            {/* TODO: Alternate activate controls to investigate */}
            {/*}<div>
            <Checkbox id={id} ripple={true} checked={track.active} onChange={this.activationChange.bind(this, id)} label={'SHOW'} ripple={true}/>
            </div>*/}
            {/*<Button raised onClick={this.activationChange.bind(this, id)}>
              <span className='material-icons'>map</span>
              <span className='button-text'>{'Show'}</span>
            </Button>*/}
            <div>
            <Switch id={id} ripple={true} checked={track.active} onChange={this.activationChange.bind(this, id)}/>
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
