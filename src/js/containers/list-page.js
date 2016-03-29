/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import FilterIcon from 'material-ui/lib/svg-icons/content/filter-list';
import MapIcon from 'material-ui/lib/svg-icons/maps/map';

import { Page } from '../components/page';
import PointList from '../components/point-list';
/*eslint-enable no-unused-vars*/

import { selectMarker } from '../actions/map-actions';
import { setDrawer } from '../reducers/drawer';
import { connect } from 'react-redux';

import history from '../history';

class ListPage extends Component {
  componentDidMount() {
    this.props.dispatch( setDrawer( 'List of Services' ) );
  }

  onPointClick( point ) {
    this.props.dispatch( selectMarker( point ) );
    history.push( `/view-point/${encodeURIComponent( point._id )}` );
  }

  render() {
    const buttonStyles = [ {
      width: 'calc(50% - 15px)',
      margin: '10px 5px 0px 10px'
    }, {
      width: 'calc(50% - 15px)',
      margin: '5px 10px 0px 5px'
    } ];
    return (
      <Page className="layout__section">
        <div>
          <RaisedButton style={ buttonStyles[ 0 ] }
            label="Map"
            labelPosition="after"
            primary={ true }
            icon={ <MapIcon /> }
            onClick={ ( ) => history.push( '/' ) } />
          <RaisedButton style={ buttonStyles[ 1 ] }
            label="Filter"
            labelPosition="after"
            primary={ true }
            icon={ <FilterIcon /> }
            onClick={ ( ) => history.push( 'filter' ) } />
          <PointList points={ this.props.services }
            clickAction={ this.onPointClick.bind( this ) } />
        </div>
      </Page>
      );
  }
}

function select( state ) {
  return {
    services: state.points
  };
}

export default connect( select )( ListPage );
