/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { AppBar, MenuItem, LeftNav, FontIcon } from 'material-ui';
import { Link } from 'react-router';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';
import bindAll from 'lodash/bindAll';

import history from '../history';

export class ACDrawer extends Component {
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
    const { login } = this.props;

    let pages = [ {
      link: '/',
      title: 'Map',
      icon: 'map'
    }, {
      link: 'filter',
      title: 'Filter',
      icon: 'filter_list'
    }, {
      link: 'add-point',
      title: 'Add Point',
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
      link: '/',
      title: 'Publish',
      icon: 'cloud_upload'
    }, {
      link: 'settings',
      title: 'Settings',
      icon: 'settings'
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
      return (
        <MenuItem key={ page.title }
          leftIcon={ <FontIcon className="material-icons">
                       { page.icon }
                     </FontIcon> }
          onTouchTap={ this.onMenuItemTap.bind( this, page ) }>
        { page.title }
        </MenuItem>
        );
    } );

    return (
      <AppBar onLeftIconButtonTouchTap={ this.showNav } title={ this.props.drawer }>
        <LeftNav docked={ false }
          onRequestChange={ this.hideNav }
          open={ this.state.open }>
          { navs }
        </LeftNav>
      </AppBar>
      );
  }
}

function select(state) {
  return {
    drawer: state.drawer,
    login: state.account.login
  };
}
export default connect( select )( ACDrawer );
