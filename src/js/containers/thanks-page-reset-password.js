/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';

import { LetterheadPage } from '../components/page';
import { Block } from '../components/block';
/*eslint-enable no-unused-vars*/

export default class ThanksPageResetPassword extends Component {
  render() {
    return (
      <LetterheadPage>
        <Block header='Your password has been updated. Please log in to continue.' />
      </LetterheadPage>
      );
  }
}
