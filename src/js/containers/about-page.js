/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { Page } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

import { connect } from 'react-redux';

import { setDrawer } from '../reducers/btc-drawer';

export class AboutPage extends Component {
  componentDidMount() {
    this.props.setDrawer( 'About' );
  }

  render() {
    return (
		<Page className="section__layout">
			<Block style={ { padding: 0 } }>
				<h2>Bicycle Touring Companion</h2>
				<i>Version 1.0 (build 9)</i><br/>
				&copy; 2015-2016 Adventure Cycling Association<br/><br/>
				Maps &copy;Thunderforest, Data &copy;OpenStreetMap contributors.<br/><br/>
				TODO: Other software and data acknowledgements go here.
			</Block>
		</Page>
      );
  }
}

function mapStateToProps( state ) {
  return {};
}

const actions = { setDrawer };

export default connect( mapStateToProps, actions )( AboutPage );