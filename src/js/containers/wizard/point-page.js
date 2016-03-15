/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, Tabs, Tab } from 'material-ui';
import { CircularProgress } from 'material-ui';
/*eslint-enable no-unused-vars*/

import BlobUtil from 'blob-util';
import { findIndex, bindAll, isEmpty, last } from 'lodash';
import { bindActionCreators } from 'redux';

import * as pointActions from '../../actions/new-point-actions';
import * as mapActions from '../../actions/map-actions';
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
    bindAll( this, 'onSubmit', 'onNext' );
  }

  // When the user navigates from the add/update point pages, reset all fields.
  componentWillUnmount() {
    this.props.pageActions.clearPointProps();
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
    const pageUrl = this.getPageUrl();
    history.push( `/${pageUrl}/${tab.url}` );
  }

  // When the wizard's form is submitted, we need to invoke the subclass'
  // `onFinal` method. We provide `onFinal` with a blob.
  //
  // TODO: refactor out the blob conversion, it should not occur here.
  onSubmit() {
    const {imageSrc} = this.props.newPoint;

    if ( isEmpty( imageSrc ) ) {
      this.onFinal.call( this );
    } else {
      BlobUtil.imgSrcToBlob( imageSrc ).then( blob => {
        this.onFinal.call( this, blob );
      } );
    }
  }

  // Override this method in your PointPage subclass to provide finalization
  // logic. This logic will be invoked when the user clicks ``Submit'' on the
  // last page in the wizard.
  onFinal() {
    console.error( 'PointPage#onFinal() is abstract' );
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
  mapPropsOnTabContent( tabContent ) {
    return React.cloneElement( tabContent, {
      ...this.props,
      ...this.props.wizardActions,
      onNext: this.onNext.bind( this, tabContent.type ),
      finalTab: this.isFinalTab( tabContent.type ),
      persist: this.props.pageActions.updatePointProps
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

    const tabContent = React.Children.only( this.props.children );
    const tabContentWithProps = this.mapPropsOnTabContent( tabContent );

    const spinner = <CircularProgress size={2} />;
    const { newPoint } = this.props;
    const content = newPoint.isFetching ? spinner : tabContentWithProps;

    return (
      <div className='layout__section'>
        <Tabs value={ tabContent.type } className="tabs-bar">
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
      newPoint: state.newPoint
    };
  }

  // This funciton is used by react-redux's `connect` to supply our React
  // component with bound action creators.
  //
  // **subclasses are expected to connect to redux themselves**. Subclasses
  // should extend this function when making their own `mapDispatchToProps`.
  static mapDispatchToProps( dispatch ) {
    return {
      // These actions will be available in `this.props.pageActions`
      pageActions: bindActionCreators( {
        'updatePointProps': pointActions.updatePointProps,
        'clearPointProps': pointActions.clearPointProps
      }, dispatch ),

      // These actions are meant for the selected tab and are available in
      // `this.props.wizardActions`
      wizardActions: bindActionCreators( {
        ...pointActions,
        ...mapActions,
        ...drawerActions
      }, dispatch )
    };
  }
}
