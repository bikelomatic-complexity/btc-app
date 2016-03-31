/*eslint-disable no-unused-vars*/
import PointList from '../components/point-list';
import { Page } from '../components/page';

import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import FilterIcon from 'material-ui/lib/svg-icons/content/filter-list';
import MapIcon from 'material-ui/lib/svg-icons/maps/map';
/*eslint-enable no-unused-vars*/

import { setDrawer } from '../reducers/drawer';
import history from '../history';

import { connect } from 'react-redux';
import { values } from 'lodash';

class ListPage extends Component {
  componentDidMount() {
    this.props.dispatch( setDrawer( 'Alerts & Services' ) );
  }

  onPointClick( point ) {
    const id = encodeURIComponent( point._id );
    history.push( `/view-point/${ id }` );
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
          <PointList points={ this.props.points }
            clickAction={ this.onPointClick.bind( this ) } />
        </div>
      </Page>
      );
  }
}

function mapStateToProps( state ) {
  return {
    points: values( state.points.points )
  };
}

export default connect( mapStateToProps )( ListPage );
