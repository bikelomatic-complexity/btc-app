/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, Tabs, Tab } from 'material-ui';
import { CircularProgress } from 'material-ui';
/*eslint-enable no-unused-vars*/

import { findIndex, bindAll, last, assign, omit } from 'lodash';
import { bindActionCreators } from 'redux';

import { loadPoint } from '../../reducers/points';
import { setMapCenter } from '../../reducers/map';
import { setDrawer } from '../../reducers/drawer';

import history from '../../history';
import '../../../css/layout.css';

// # Point Page
// The PointPage is an abstract base class for the wizard's root page.
// It is used to add or update points on the map.
//
// The PointPage knows how to render the current page of the wizard along with
// a row of tabs above that page. Additionally, the PointPage gives the current
// wizard page all the props it needs to render correctly, since WizardPages
// are stateless.
//
// The AddAlertPage, AddServicePage, and UpdateServicePage extend this base
// class by implementing some template methods.
//
//  - getPageUrl()                Url back to this page
//  - getTabSet()                 Specifies the tabs needed for this page
//  - componentWillMount()        Provide default state
//  - componentDidMount()         Fetch real state
//  - componentWillReceiveProps() Update real state
//  - isReady()                   Returns true once state is fetched
//  - onFinal()                   Handle submitted form data
//
// The PointPage handles state for itself and for the wizard pages. State is
// shaped like this:
// ```
// {
//   point: {...},   # fields for a point
//   coverBlob: Blob # blob for the point's cover
// }
// ```
export default class PointPage extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onSubmit', 'onNext', 'persist' );

    this.state = { point: {} };
  }

  // #getPageUrl
  // We append the url of a wizard page to this base url when we want to
  // generate a link to a tab.
  getPageUrl() {
    console.error( 'PointPage#getPageUrl() is abstract' );
  }

  // # getTabSet
  // Return an array of tab structs from tabs.js. The wizard will be created in
  // the order of the array you return.
  getTabSet() {
    console.error( 'PointPage#getTabs() is abstract' );
    return [];
  }

  // # isReady
  // This method should return true once fetched data is ready.
  //
  // We will not render the wizard pages until this method returns true,
  // because we need to ensure the underlying fields' defaultValues are
  // provided at the right time.
  isReady() {
    console.error( 'PointPage#isReady() is abstract' );
    return false;
  }

  // # onFinal
  // Handle the submitted form data.
  onFinal() {
    console.error( 'PointPage#onFinal() is abstract' );
  }

  // # isFinalTab
  // Return true if the passed tab class is last in the wizard order.
  isFinalTab( curTab ) {
    const set = this.getTabSet();
    return curTab === last( set ).value;
  }

  // # isValid
  // Returns an object with valid property (bool) and a list
  // of validation errors.
  // By default, it returns valid as true.
  //
  // isValid is called before navigating from the current tab,
  // and stops the navigation if the state would be malformed / invalid.
  isValid() {
    return {
      valid: true,
      validationErrors: []
    };
  }

  // # persist
  // Callback for wizard pages to help save their data.
  //
  // The overall state for each of the wizard pages is held in the point page
  // component. So, when we leave one wizard page and move to the next tab,
  // we need to save the entered data back here.
  //
  // We don't want to save the coverBlob into a point model. So, if it exists,
  // we move it to its own key in the state.
  //
  // If the second argument, `after` is supplied, it will be invoked after
  // data is persisted. Meaning, the `after` funciton will have access to the
  // updated sate.
  persist( fields, after ) {
    const attributes = omit( fields, 'coverBlob' );
    const coverBlob = fields.coverBlob;

    this.setState( ( state, props ) => {
      const nextState = {
        point: assign( {}, state.point, attributes )
      };
      if ( coverBlob ) {
        nextState.coverBlob = coverBlob;
      }
      return nextState;
    }, after );
  }

  // # onNext
  // Navigation callback provided to the WizardPage (after binding). This
  // funciton must be bound to the current tab, so we can find out which tab is
  // next! The first argument, `curTab` is the React class for the current
  // wizard page.
  //
  // When we are on the last WizardPage, we want to submit the form. Otherwise,
  // we want to progress to the next page in the wizard.
  //
  // This callback is installed in the ``onClick'' handler for the ``Next``
  // (or ``Skip'',``Submit'', etc.) button at the bottom of each WizardPage.
  // The underlying methods, `navigateToTab` and `onSubmit` are responsible
  // on their own for persisting data before navigation.
  onNext( curTab ) {
    const set = this.getTabSet();

    const tabIndex = findIndex( set, { value: curTab } );
    const nextTab = set[ tabIndex + 1 ];

    // commit the current state to check if the fields 
    // are valid before navigating forward
    const {wizard} = this.refs;
    if ( wizard ) {
      wizard.persistBefore( () => {
        const check = this.isValid();

        // if the tab fields are invalid, and we are not on the first index
        if ( ( !check.valid ) && ( tabIndex > 0 ) ) {
          // submit the current validation errors to state

          // format the errors into a coherent shape
          validationErrors = check.validationErrors.reduce( ( error, allErrors )=>{
            allErrors[error.datapath] = error;
            return allErrors;
          }, {});

          // set and submit  the state to the wizard page
          this.setState( {...this.state, validationErrors: validationErrors} );
          wizard.persistBefore();
          console.error(validationErrors);
          // shortcircuit the page
          return;
        }

        if ( nextTab ) {
          this.navigateToTab( nextTab );
        } else {
          this.onSubmit();
        }

      } );
    }
    
  }

  // # navigateToTab
  // Given a new tab, persist the data in the current tab, then navigate to the
  // url that selects that new tab. The url varies based on what `getPageUrl`
  // returns.
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

  // # onSubmit
  // When the wizard's form is submitted, invoke the subclass' onFinal method.
  //
  // Also, set the map's center to our point's location. The user will have
  // moved the map around while choosing a location. We want to make sure the
  // map page is in the right place after the wizard is completed.
  onSubmit() {
    const {pageActions} = this.props;
    const {point} = this.state;
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

  // # mapPropsOnWizardPage
  // Clone the wizard page from childen with the right props.
  //
  // The wizard page supplied as the only child in `tabContent` will be a
  // stateless component. We need to give it the correct props and actions
  // to display correctly.
  //
  //  - Bound action creators are passed through this.props.wizardActions
  //  - Additional functions are also passed
  //  - We give the wizard page a ref so we can call `persistBefore` inside it
  //
  // `onNext` will be called by a WizardPage when the user clicks the next
  // button at the bottom of the page. The behavior of `onNext` changes based
  // on the user's progress through the wizard.
  mapPropsOnWizardPage( wizardPage ) {
    return React.cloneElement( wizardPage, {
      ref: 'wizard',
      ...this.props,
      ...this.props.wizardActions,
      point: this.state.point,
      persist: this.persist,
      validationErrors: this.state.validationErrors,
      onNext: this.onNext.bind( this, wizardPage.type ),
      finalTab: this.isFinalTab( wizardPage.type )
    } );
  }

  // # render
  // Render a row of tabs as specified by the PointPage subclass, followed by
  // the wizard page for that tab.
  //
  // The router supplies us with a single child in `this.props.children`.
  // This is the wizard content for our selected tab. Since the wizard content
  // is just a React class, we know its type via `wizardPage.type`. The row of
  // tabs are keyed by component type, allowing us to mark the selected tab.
  //
  // We do need to supply the chosen wizardPage with its dependencies, since
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

  // # mapStateToProps
  // This function is used by react-redux's `connect` to supply our
  // React component with a slice of the redux store.
  //
  // **subclasses are expected to connect to redux themselves**. Subclasses
  // should extend this function when making their own `mapStateToProps`.
  static mapStateToProps( state ) {
    return {
      points: state.points.points,
    };
  }

  // # mapDispatchToProps
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
        setDrawer: setDrawer
      }, dispatch )
    };
  }
}
