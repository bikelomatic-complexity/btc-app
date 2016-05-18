
/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { RaisedButton, CardText, List, ListItem, Toggle, Divider } from 'material-ui';

import { Page } from '../components/page';
import { Block } from '../components/block';
import { SettingSwitch } from '../components/setting-switch';

import Refresh from 'material-ui/lib/svg-icons/navigation/refresh';
import Delete from 'material-ui/lib/svg-icons/action/delete';
/*eslint-enable no-unused-vars*/

import noop from 'lodash/noop';

import { resetPoints, replicatePoints } from '../reducers/points';
import { setOnlineMode } from '../reducers/settings';
import { connect } from 'react-redux';

import { setDrawer } from '../reducers/drawer';

export class SettingsPage extends Component {
  componentDidMount() {
    this.props.setDrawer( 'Settings' );
  }

  render() {
    const {setOnlineMode, replicatePoints, resetPoints, settings} = this.props;

    const toggleItems = [ {
      text: 'Offline mode',
      subtext: 'Don\'t connect to the internet',
      toggled: !settings.onlineMode,
      onToggle: offline => setOnlineMode( !settings.onlineMode )
    }, {
      text: 'Download on mobile',
      subtext: 'Use 3G or 4G data',
      toggled: false,
      onToggle: noop
    } ].map( item => {
      const tog = (
      <Toggle toggled={ item.toggled }
        onToggle={ item.onToggle } />
      );
      return (
        <ListItem key={ item.text }
          primaryText={ item.text }
          secondaryText={ item.subtext }
          rightToggle={ tog } />
        );
    } );

    const date = 'Last updated: ' + new Date().toLocaleDateString();
    const lastUpdated = (
    <ListItem primaryText='Update now'
      onClick={ replicatePoints }
      secondaryText={ date }
      leftIcon={ <Refresh /> } />
    );

    const clearPoints = (
    <ListItem primaryText='Delete cache'
      onClick={ resetPoints }
      secondaryText='80 MB'
      leftIcon={ <Delete /> } />
    );

    const {loggedIn, email} = this.props.login;
    let account;
    if ( loggedIn ) {
      account = (
        <List subheader='Your account'>
          <ListItem disabled
            primaryText={ email }
            secondaryText='email' />
        </List>
      );
    }

    /*esfmt-ignore-start*/
    return (
      <Page className="section__layout">
        <Block style={ { padding: 0 } }>
          <List subheader='Network'>
            { toggleItems }
          </List>
          <Divider />
          <List subheader='Services and Alerts'>
            { lastUpdated }
            { clearPoints }
          </List>
          <Divider />
          { account }
        </Block>
      </Page>
      );
      /*esfmt-ignore-end*/
  }
}

function mapStateToProps( state ) {
  return {
    settings: state.settings,
    login: state.account.login
  };
}

const actions = { resetPoints, replicatePoints, setOnlineMode, setDrawer };

export default connect( mapStateToProps, actions )( SettingsPage );
