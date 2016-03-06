/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
/*eslint-enable no-unused-vars*/

// The page component is a responsive way to display content in the center
// of the screen.
//
// On desktop, the width of the page is limited, so conent does not span
// the whole screen.
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

// The `LetterheadPage` extends the `Page` with the adventure cycling logo
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
