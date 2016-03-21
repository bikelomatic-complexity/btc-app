import PointPage from './point-page';
import * as tabs from './tabs';

import history from '../../history';
import { addAlert } from '../../reducers/points';
import { Alert, alertTypes } from 'btc-models/lib/schema/types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class AddAlertPage extends PointPage {
  getPageUrl() {
    return '/add-alert';
  }

  getTabSet() {
    return [
      tabs.PointLocationTab,
      tabs.AlertNameDescriptionTab
    ];
  }

  onFinal( blob = undefined ) {
    const { addAlert, newPoint } = this.props;

    const alert = new Alert( newPoint );
    if( alert.isValid() ) {
      addAlert( alert, blob );
      history.push( '/' );
    }
  }
}

function mapStateToProps( state ) {
  return {
    ...PointPage.mapStateToProps.apply( this, arguments ),
    mapState: state.mapState, // You need a map to place an alert
    types: alertTypes // You need to choose an alert type
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    ...PointPage.mapDispatchToProps.apply( this, arguments ),
    ...bindActionCreators( {
      'addAlert': addAlert
    }, dispatch )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( AddAlertPage );
