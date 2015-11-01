import React, {Component} from 'react';
import { render } from 'react-dom';

import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import MyMap from './my-map';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Layout fixedHeader>
          <Header title="Adventure Cycling" />
          <Drawer title="Menu">
            <Navigation>
              <a href="">Services</a>
              <a href="">Points of Interest</a>
              <a href="">Alerts</a>
              <a href="">Filter</a>
            </Navigation>
          </Drawer>
          <MyMap services={this.props.services}/>
        </Layout>
      </div>
    );
  }
}
