/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { AppBar, MenuItem, LeftNav } from 'material-ui';
import { Link } from 'react-router';
/*eslint-enable no-unused-vars*/

import bindAll from 'lodash/bindAll';

export class ACDrawer extends Component {
  constructor( props ) {
    super( props );
    this.state = { open: false };
    bindAll( this, 'onMenuItemTap', 'showNav', 'hideNav' );
  }

  hideNav() {
    this.setState( { open: false } );
  }

  showNav() {
    this.setState( { open: true } );
  }

  onMenuItemTap( page ) {
    this.props.history.pushState( null, page.link );
    this.hideNav();
  }

  render() {
    const {account} = this.props;

    let pages = [ {
      link: '/',
      title: 'Map'
    }, {
      link: 'filter',
      title: 'Filter'
    }, {
      link: 'add-point',
      title: 'Add Point'
    }, {
      link: 'download-track',
      title: 'Download Track'
    }, {
      link: 'settings',
      title: 'Settings'
    } ];

    if ( account.login.loggedIn ) {
      pages.push( {
        link: 'logout',
        title: 'Logout'
      } );
    } else {
      pages.push( {
        link: 'login',
        title: 'Login'
      } );
    }

    let navs = pages.map( ( page ) => {
      return (
        <MenuItem key={ page.title }
          onTouchTap={ this.onMenuItemTap.bind( this, page ) }>
        { page.title }
        </MenuItem>
        );
    } );

    return (
      <AppBar onLeftIconButtonTouchTap={ this.showNav }
        title={ this.props.page }>
        <LeftNav docked={ false }
          onRequestChange={ this.hideNav }
          open={ this.state.open }>
          { navs }
        </LeftNav>
      </AppBar>
      );
  }
}

export default ACDrawer;
