import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { alertTypes } from 'btc-models/lib/schema/types';

import PointPage from './point-page';
import * as tabs from './tabs';
import { userAddPoint } from '../../reducers/points';

import history from '../../history';

export class AddAlertPage extends PointPage {
  getPageUrl() {
    return '/add-alert';
  }

  getTabSet() {
    return [
      tabs.PointLocationTab,
      tabs.AlertNameDescriptionTab,
    ];
  }

  onFinal( blob = undefined ) {
    const point = this.props.newPoint;

    console.error( 'implement AddAlertPage.onFinal()');

    // this.props.userAddAlert( {
    //
    // } );

    history.push( '/' );
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments ),
    mapState: state.mapState, // You need a map to place an alert
    types: alertTypes         // You need to choose an alert type
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'userAddPoint': userAddPoint
    }, dispatch )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( AddAlertPage );
