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

  isReady() {
    return true;
  }

  onFinal( point, blob = undefined ) {
    const { addAlert } = this.props;

    const alert = new Alert( point );
    if( alert.isValid() ) {
      addAlert( alert, blob );
      history.push( '/' );
    } else {
      console.error(alert.validationError);
    }
  }

  static mapStateToProps( state ) {
    return {
      ...super.mapStateToProps( state ),
      map: state.map, // You need a map to place an alert
      types: alertTypes // You need to choose an alert type
    };
  }

  static mapDispatchToProps( dispatch ) {
    return {
      ...super.mapDispatchToProps( dispatch ),
      ...bindActionCreators( {
        'addAlert': addAlert
      }, dispatch )
    };
  }
}

export default connect(
  AddAlertPage.mapStateToProps,
  AddAlertPage.mapDispatchToProps
)( AddAlertPage );
