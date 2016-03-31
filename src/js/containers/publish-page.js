/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, FontIcon, RaisedButton } from 'material-ui';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';

import { Page } from '../components/page';

import PointList from '../components/point-list';
/*eslint-enable no-unused-vars*/

import { selectMarker } from '../actions/map-actions';
import { setDrawer } from '../reducers/drawer';
import { connect } from 'react-redux';

import history from '../history';

class PublishPage extends Component {
  componentDidMount() {
    this.props.dispatch( setDrawer( 'Publish' ) );
  }

  onPointClick( point ) {
    this.props.dispatch( selectMarker( point ) );
    history.push( `/view-point/${encodeURIComponent( point._id )}` );
  }

  onPointRemove( point ) {
    // TODO: implement onPointRemove
  }

  render() {
    const clear = (<ClearIcon style={ { fontSize: 'inherit', margin: '0px 0.1em' } }
                     color='red' /> );

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

    const instructions = (<div style={ instructionsStyle }>
                            Click on
                            { clear } to delete a point.
                          </div>);

    return (
      <Page className="layout__section">
        <Paper>
          <PointList instructions={ instructions }
            points={ this.props.services }
            buttonIcon='clear'
            buttonAction={ this.onPointRemove.bind( this ) }
            clickAction={ this.onPointClick.bind( this ) } />
          <div style={ instructionsStyle }>
            <RaisedButton style={ buttonStyle }
              label="Publish"
              primary={ true } />
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
