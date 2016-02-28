/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/

export class Page extends Component {
  render() {
    return (
      <div className='page'>
        <div className='page__paper'>
          { this.props.children }
        </div>
      </div>
      );
  }
}

export class LetterheadPage extends Component {
  render() {
    return (
      <Page>
        <img className='page__logo' src={ this.props.logo } />
        { this.props.children }
      </Page>
      );
  }
}

LetterheadPage.propTypes = { logo: React.PropTypes.string };
LetterheadPage.defaultProps = { logo: 'img/advc-big.jpg' };
