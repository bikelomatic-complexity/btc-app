/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, FontIcon, RaisedButton } from 'material-ui';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';

import { Page } from '../components/page';

import PointList from '../components/point-list';
/*eslint-enable no-unused-vars*/

import { publishPoints } from '../reducers/points';
import { setDrawer } from '../reducers/drawer';
import history from '../history';

import { connect } from 'react-redux';
import { bindAll } from 'lodash';

class PublishPage extends Component {
  componentDidMount() {
    this.props.setDrawer( 'Publish' );
    bindAll( this, 'onPublish', 'onPointClick', 'onPointRemove' );
  }

  onPointClick( point ) {
    history.push( `/view-point/${encodeURIComponent( point._id )}` );
  }

  onPointRemove( point ) {
    // TODO: implement onPointRemove
  }

  onPublish() {
    this.props.publishPoints();
  }

  render() {
    const clear = (
    <ClearIcon style={ { fontSize: 'inherit', margin: '0px 0.1em' } }
      color='red' />
    );

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

    const instructions = (
    <div style={ instructionsStyle }>
      Click on
      { clear } to delete a point.
    </div>
    );

    return (
      <Page className="layout__section">
        <Paper>
          <PointList instructions={ instructions }
            points={ this.props.points }
            buttonIcon='clear'
            buttonAction={ this.onPointRemove.bind( this ) }
            clickAction={ this.onPointClick.bind( this ) } />
          <div style={ instructionsStyle }>
            <RaisedButton style={ buttonStyle }
              disabled={ this.props.points.length === 0 }
              onClick={ this.onPublish }
              label="Publish"
              primary={ true } />
          </div>
        </Paper>
      </Page>
      );
  }
}

function mapStateToProps( state ) {
  return {
    points: state.points.publish.updated.map( id => state.points.points[ id ] )
  };
}

const mapDispatchToProps = { publishPoints, setDrawer };

export default connect( mapStateToProps, mapDispatchToProps )( PublishPage );
