import React, {Component} from 'react';

import { Drawer, Navigation } from 'react-mdl';

class ACDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pages = [
      {link: "", title: "Map"},
      {link: "", title: "Services"},
      {link: "", title: "Points of Interest"},
      {link: "", title: "Alerts"},
      {link: "", title: "Filter"},
      {link: "", title: "Add Point"}
    ];

    let navs = pages.map((page) => {
      let classNames = "";
      if (this.props.page == page.title) {
        classNames = "selected-page";
      }
      return (<a key={page.title} className={classNames} href={page.link}>{page.title}</a>);
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
