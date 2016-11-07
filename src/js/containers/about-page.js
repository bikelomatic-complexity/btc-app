/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { Page } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

export default class AboutPage extends Component {
  render() {
    return (
		<Page className="section__layout">
			<Block style={ { padding: 0 } }>
				<h2>Bicycle Touring Companion</h2>
				<i>Version 1.0 (build 6)</i><br/>
				&copy; 2015-2016 Adventure Cycling Association<br/>
				Maps &copy; <a href="http://www.thunderforest.com">Thunderforest</a>, Data &copy; <a href="http://osm.org/copyright">
				OpenStreetMap</a> contributors
			</Block>
		</Page>
      );
  }
}
