import React, {Component} from 'react';

import { AppBar, MenuItem, LeftNav } from 'material-ui';
import { Link } from 'react-router';

export class ACDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false}
  }

  toggleNav(){
    this.setState({open:!(this.state.open)})
  }

  onMenuItemTap(page){
    this.props.history.pushState(null, page.link);
    this.toggleNav();
  }

  render() {
    let pages = [
      {link: "/", title: "Map"},
      {link: "filter", title: "Filter"},
      {link: "add-point", title: "Add Point"},
      {link: "download-track", title: "Download Track"},
      {link: "settings", title: "Settings"},
      {link: "login", title: "Login"}
    ];

    let navs = pages.map((page) => {
      return (<MenuItem key={page.title}
                    onTouchTap={this.onMenuItemTap.bind(this,page)}>
                {page.title}
              </MenuItem>);
    });

    return (
      <AppBar
        onLeftIconButtonTouchTap={this.toggleNav.bind(this)}
        title={this.props.page}>
        <LeftNav
          docked={false}
          onRequestChange={this.toggleNav.bind(this)}
          open={this.state.open}>
          { navs }
        </LeftNav>
      </AppBar>
    );
  }
}


export default ACDrawer;
