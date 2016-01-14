import React, {Component} from 'react';

import { Drawer, Navigation } from 'react-mdl';
import { Link } from 'react-router';

class ACDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pages = [
      {link: "login", title: "Login"},
      {link: "/", title: "Map"},
      {link: "", title: "Services"},
      {link: "", title: "Points of Interest"},
      {link: "", title: "Alerts"},
      {link: "", title: "Filter"},
      {link: "add-point", title: "Add Point"},
      {link: "download-track", title: "Download Track"}
    ];

    let navs = pages.map((page) => {
      let classNames = "";
      if (this.props.page == page.title) {
        classNames = "selected-page";
      }
      return (<Link key={page.title} className={classNames} to={page.link}>{page.title}</Link>);
    });

    return (
      <Drawer title="Menu">
        <Navigation>
          { navs }
        </Navigation>
      </Drawer>
    );
  }
}


export default ACDrawer;
