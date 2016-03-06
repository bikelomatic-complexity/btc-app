import React, {Component} from 'react';

import { AppBar, MenuItem, LeftNav, FontIcon } from 'material-ui';
import { Link } from 'react-router';

export class ACDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false}
  }

  hideNav(){
    this.setState({open:false});
  }

  showNav(){
    this.setState({open:true});
  }

  onMenuItemTap(page){
    this.props.history.pushState(null, page.link);
    this.hideNav();
  }

  render() {
    let pages = [
      {link: "/", title: "Map", icon: "map"},
      {link: "filter", title: "Filter", icon: "filter_list"},
      {link: "add-point", title: "Add Point", icon: "add_location"},
      {link: "add-alert", title: "Add Alert", icon: "warning"},
      {link: "download-track", title: "Download Track", icon: "cloud_download"},
      {link: "settings", title: "Settings", icon: "settings"},
      {link: "login", title: "Login", icon: "account_box"}
    ];

    let navs = pages.map((page) => {
      return (<MenuItem key={page.title}
                    leftIcon={<FontIcon className="material-icons">{page.icon}</FontIcon>}
                    onTouchTap={this.onMenuItemTap.bind(this,page)}>
                {page.title}
              </MenuItem>);
    });

    return (
      <AppBar
        onLeftIconButtonTouchTap={this.showNav.bind(this)}
        title={this.props.page}>
        <LeftNav
          docked={false}
          onRequestChange={this.hideNav.bind(this)}
          open={this.state.open}>
          { navs }
        </LeftNav>
      </AppBar>
    );
  }
}


export default ACDrawer;
