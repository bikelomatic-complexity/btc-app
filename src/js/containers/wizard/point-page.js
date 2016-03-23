/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, Tabs, Tab } from 'material-ui';
import { CircularProgress } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { findIndex, bindAll, last, merge, omit } from 'lodash';
import { bindActionCreators } from 'redux';

import { loadPoint } from '../../reducers/points';
import { setMapCenter } from '../../reducers/map';
import * as drawerActions from '../../reducers/drawer';

import history from '../../history';
import '../../../css/layout.css';

// The PointPage is an abstract base class for the wizard's root page.
// It is used to add or update points on the map.
//
// The PointPage knows how to render the current page of the wizard along with
// a row of tabs above that page. Additionally, the PointPage gives the current
// wizard page all the props it needs to render correctly, since WizardPages
// are stateless (with the exception of the AddPointLocation page).
export default class PointPage extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onSubmit', 'onNext', 'persist' );

    this.state = { point: {} };
  }

  // Override this method in your PointPage subclass to match the url you
  // chose in the Routes definiton for this page. For example, AddPointPage
  // returns '/add-point'.
  //
  // We append the url of a wizard page to this base url when we want to
  // generate a link to a tab.
  getPageUrl() {
    console.error( 'PointPage#getPageUrl() is abstract' );
  }

  // Override this method in your PointPage subclass to return an array
  // of tab structs from tabs.js. The wizard will be created in the order
  // of the array you return.
  getTabSet() {
    console.error( 'PointPage#getTabs() is abstract' );
    return [];
  }

  // By default, a point page does not need to fetch any data,
  // and should just start out with a blank point.
  componentWillMount() {
    console.error( 'PointPage subclasses must implement componentWillMount()' );
  }

  isReady() {
    console.error( 'PointPage#isReady() is abstract' );
    return false;
  }

  // When we are on the last WizardPage, we want to submit the form. Otherwise,
  // we want to progress to the next page in the wizard.
  //
  // This callback is installed in the ``onClick'' handler for the ``Next``
  // (or ``Skip'',``Submit'', etc.) button at the bottom of each WizardPage.
  onNext( curPageType ) {
    const set = this.getTabSet();

    const tabIndex = findIndex( set, { value: curPageType } );
    const nextTab = set[ tabIndex + 1 ];

    if ( nextTab ) {
      this.navigateToTab( nextTab );
    } else {
      this.onSubmit();
    }
  }

  isFinalTab( curPageType ) {
    const set = this.getTabSet();
    return curPageType === last( set ).value;
  }

  // Given a tab, navigate to the url that selects that tab. The url varies
  // based on the PointPage subclass.
  navigateToTab( tab ) {
    const url = this.getPageUrl();
    const nav = history.push.bind( null, `/${ url }/${ tab.url }` );

    const {wizard} = this.refs;
    if ( wizard ) {
      wizard.persistBefore( nav );
    } else {
      nav();
    }
  }

  // When the wizard's form is submitted, we need to invoke the subclass'
  // onFinal method. Also, set the map's center to our point's location. The
  // user will have moved the map around while choosing a location. We want
  // to make sure the map page is in the right place after the wizard is
  // completed.
  onSubmit() {
    const {pageActions} = this.props;
    const {point, coverBlob} = this.state;
    const onFinal = this.onFinal.bind( this );

    if ( point.location ) {
      pageActions.setMapCenter( point.location );
    }

    const {wizard} = this.refs;
    if ( wizard ) {
      wizard.persistBefore( onFinal );
    } else {
      onFinal();
    }
  }

  // Override this method in your PointPage subclass to provide finalization
  // logic. This logic will be invoked when the user clicks ``Submit'' on the
  // last page in the wizard.
  onFinal() {
    console.error( 'PointPage#onFinal() is abstract' );
  }

  persist( fields, after ) {
    const attributes = omit( fields, 'coverBlob' );

    this.setState( ( state, props ) => {
      const ret = merge( {}, state, {
        point: attributes,
        coverBlob: fields.coverBlob
      } );
      return ret;
    }, after );
  }

  // The wizard page supplied as the only child in `tabContent` will be a
  // stateless component. We need to give it the correct props and actions
  // to display correctly.
  //
  //  - State is passed through this.props
  //  - Bound action creators are passed through this.props.wizardActions
  //  - Additional funcitons are also passed.
  //
  // `onNext` will be called by a WizardPage when the user clicks the next
  // button at the bottom of the page. The behavior of `onNext` changes based
  // on the user's progress through the wizard.
  //
  // `persist` is called when a WizardPage is unmounted. This allows us to
  // save the user's data entry only at the time of unmount.
  mapPropsOnWizardPage( wizardPage ) {
    return React.cloneElement( wizardPage, {
      ref: 'wizard',
      ...this.props,
      ...this.props.wizardActions,
      point: this.state.point,
      persist: this.persist,
      onNext: this.onNext.bind( this, wizardPage.type ),
      finalTab: this.isFinalTab( wizardPage.type )
    } );
  }

  // Render a row of tabs as specified by the PointPage subclass, followed by
  // the wizard page for that tab.
  //
  // The router supplies us with a single child in `this.props.children`.
  // This is the wizard content for our selected tab. Since the wizard content
  // is just a React Component, we know its type via `tabContent.type`. The
  // row of tabs are keyed by component type, allowing us to mark the selected
  // tab.
  //
  // We do need to supply the chosen `tabContent` with its dependencies, since
  // wizard components are not connected to the redux store.
  render() {
    const tabs = this.getTabSet().map( tab => (
      <Tab key={ tab.value }
        value={ tab.value }
        onClick={ this.navigateToTab.bind( this, tab ) }
        icon={ tab.icon } />
    ) );

    const wizardPage = React.Children.only( this.props.children );
    const wizardPageWithProps = this.mapPropsOnWizardPage( wizardPage );

    const spinner = <CircularProgress size={ 2 } />;
    const content = this.isReady() ? wizardPageWithProps : spinner;

    return (
      <div className='layout__section'>
        <Tabs value={ wizardPage.type }
          className="tabs-bar">
          { tabs }
        </Tabs>
        { content }
      </div>
      );
  }

  // This function is used by react-redux's `connect` to supply our
  // React component with a slice of the redux store.
  //
  // **subclasses are expected to connect to redux themselves**. Subclasses
  // should extend this function when making their own `mapStateToProps`.
  static mapStateToProps( state ) {
    return {
      points: state.points
    };
  }

  // This function is used by react-redux's connect() to supply our React
  // component with bound action creators. All the actions in `wizardActions`
  // will be passed to the underlying wizard pages. The actions in
  // `pageActions` will be available to the page itself.
  //
  // **subclasses are expected to connect to redux themselves**. Subclasses
  // should extend this function when making their own `mapDispatchToProps`.
  static mapDispatchToProps( dispatch ) {
    return {
      pageActions: bindActionCreators( {
        loadPoint: loadPoint,
        setMapCenter: setMapCenter
      }, dispatch ),
      wizardActions: bindActionCreators( {
        ...drawerActions
      }, dispatch )
    };
  }
}
