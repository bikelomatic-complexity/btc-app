/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

export default class ThanksPage extends Component {
  render() {
    return (
      <LetterheadPage>
        <Block header='To complete registration, check your email.' />
      </LetterheadPage>
      );
  }
}
