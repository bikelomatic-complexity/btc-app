/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { AppBar, Badge, Drawer, FontIcon, MenuItem } from 'material-ui';

import { Link } from 'react-router';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import bindAll from 'lodash/bindAll';

import history from '../history';

export class BtcDrawer extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onMenuItemTap', 'showNav', 'hideNav' );

    this.state = { open: false };
  }

  hideNav() {
    this.setState( { open: false } );
  }

  showNav() {
    this.setState( { open: true } );
  }

  onMenuItemTap( page ) {
    history.push( page.link );
    this.hideNav();
  }

  render() {
    const {login, publishable} = this.props;

    let pages = [ {
      link: '/',
      title: 'Map',
      icon: 'map'
    }, {
      link: 'filter',
      title: 'Filter',
      icon: 'filter_list'
    }, {
      link: 'add-service',
      title: 'Add Service',
      icon: 'add_location'
    }, {
      link: 'add-alert',
      title: 'Add Alert',
      icon: 'warning'
    }, {
      link: 'download-track',
      title: 'Download Track',
      icon: 'timeline'
    }, {
      link: 'publish',
      title: 'Publish',
      icon: 'cloud_upload',
      badge: publishable
    }, {
      link: 'settings',
      title: 'Settings',
      icon: 'settings'
    }, {
      link: 'about',
      title: 'About',
      icon: 'info'
    } ];

    if ( login.loggedIn ) {
      pages.push( {
        link: 'logout',
        title: 'Logout',
        icon: 'account_box'
      } );
    } else {
      pages.push( {
        link: 'login',
        title: 'Login',
        icon: 'account_box'
      } );
    }

    let navs = pages.map( page => {
      const icon = (
      <FontIcon className="material-icons">
        { page.icon }
      </FontIcon>
      );

      const text = page.title + ( page.badge ? ` (${page.badge})` : '' );

      return (
        <MenuItem key={ page.title }
          leftIcon={ icon }
          onTouchTap={ this.onMenuItemTap.bind( this, page ) }>
        { text }
        </MenuItem>
        );
    } );

    return (
      <AppBar onLeftIconButtonTouchTap={ this.showNav }
        title={ this.props.drawer }>
        <Drawer docked={ false }
          onRequestChange={ this.hideNav }
          open={ this.state.open }>
          { navs }
        </Drawer>
      </AppBar>
      );
  }
}

function mapStateToProps( state ) {
  return {
    drawer: state.drawer,
    login: state.account.login,
    publishable: state.points.publish.updated.length
  };
}
export default connect( mapStateToProps )( BtcDrawer );
