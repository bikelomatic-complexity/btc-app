/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, FontIcon, Card, CardMedia, CardTitle, CardActions, CardText, LinearProgress } from 'material-ui';
import DeviceStorage from '../components/device-storage';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import { isFinite } from 'underscore';

import { fetchTrack, clearTrack, activateTrack, deactivateTrack } from '../reducers/tracks';

class DownloadTrackPage extends Component {

  componentDidMount() {
    const {setDrawer} = this.props;
    setDrawer( 'Download Track' );
  }

  onSaveTrack( id, pkg ) {
    this.props.dispatch( fetchTrack( id, pkg ) );
  }

  onCancelTrack( id ) {
    console.log( 'FIXME: `onCancelTrack`' );
  }

  onRemoveTrack( id ) {
    this.props.dispatch( clearTrack( id ) );
  }

  onActivationTrack( id, val ) {
    const fn = val ? activateTrack : deactivateTrack;
    this.props.dispatch( fn( id ) );
  }

  render() {
    const {tracks} = this.props;

    const downloaded = Object.keys( tracks ).reduce( ( pre, cur ) => {
      return pre + ( tracks[ cur ].status === 'fetched' );
    }, 0 );

    const rows = Object.keys( tracks ).map( id => {
      const track = tracks[ id ];

      /*eslint-disable no-unused-vars*/
      let progressBar;
      /*eslint-enable no-unused-vars*/
      if ( track.isFetching === true ) {
        progressBar = (
          <LinearProgress indeterminate={ true } />
        );
      } else if ( isFinite( track.isFetching ) ) {
        progressBar = (
          <LinearProgress progress={ track.isFetching * 100 } />
        );
      }

      // TODO: Refactor this using O-O principles
      let downloadButtonText;
      let isSave;
      let action;
      if ( track.isFetching ) {
        downloadButtonText = 'Cancel';
        isSave = false;
        action = this.onCancelTrack.bind( this, id );
      } else if ( track.status === 'available' ) {
        downloadButtonText = 'Remove';
        isSave = false;
        action = this.onRemoveTrack.bind( this, id );
      } else {
        downloadButtonText = 'Save';
        isSave = true;
        action = this.onSaveTrack.bind( this, id, track.pkg );
      }

      return (
        <Card key={ id } style={ { margin: 16 } }>
          <CardMedia overlay={ <CardTitle title={ track.name } subtitle={ `${track.sizeMiB} MiB` } /> }>
            <img src='./img/usbr20.png' />
          </CardMedia>
          <CardText>
            { track.description }
          </CardText>
          <CardActions>
            <RaisedButton secondary={ isSave }
              primary={ !isSave }
              onClick={ action }
              label={ downloadButtonText }
              icon={ <FontIcon className='material-icons'>
                       cloud_download
                     </FontIcon> } />
            <RaisedButton id={ id }
              label='Show Track'
              secondary={ track.active }
              onClick={ this.onActivationTrack.bind( this, id, !track.active ) }
              icon={ <FontIcon className='material-icons'>
                       visibility
                     </FontIcon> } />
          </CardActions>
        </Card>
        );
    } );

    return (
      <div className="page-content">
        <DeviceStorage downloaded={ downloaded } />
        { rows }
      </div>
      );
  }
}

const select = state => {
  return { tracks: state.tracks.toJS() };
};
export default connect( select )( DownloadTrackPage );
