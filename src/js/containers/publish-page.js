/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, FontIcon, RaisedButton } from 'material-ui';
import { Page } from '../components/page';

import PointList from '../components/point-list';
/*eslint-enable no-unused-vars*/

import { selectMarker } from '../actions/map-actions';
import { setDrawer } from '../reducers/drawer';
import { connect } from 'react-redux';

import history from '../history';

class PublishPage extends Component {
  componentDidMount() {
    this.props.dispatch( setDrawer( 'Publish Services' ) );
  }

  onPointClick( point ) {
    this.props.dispatch( selectMarker( point ) );
    history.push( `/view-point/${encodeURIComponent( point._id )}` );
  }

  onPointRemove( point ) {
    console.log( 'REMOVE THE POINT!' );
  }

  render() {
    const clear = (<FontIcon className="material-icons"
                     style={ { fontSize: 'inherit', margin: '0px 0.1em' } }
                     color='red'>clear</FontIcon>);

    const instructionsStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '10px'
    };

    const buttonStyle = {
      width: '50%',
      margin: '5px 10px 0px 5px'
    };

    return (
      <Page className="layout__section">
        <Paper>
          <div style={ instructionsStyle }>
            Click on
            { clear } to delete a point.
          </div>
          <PointList points={ this.props.services }
            buttonIcon='clear'
            buttonAction={ this.onPointRemove.bind( this ) }
            clickAction={ this.onPointClick.bind( this ) } />
          <div style={ instructionsStyle }>
            <RaisedButton style={ buttonStyle }
              label="Publish"
              primary={ true }
              onClick={ ( ) => {
                        } } />
          </div>
        </Paper>
      </Page>
      );
  }
}

function select( state ) {
  return {
    services: state.points
  };
}

export default connect( select )( PublishPage );
