/*eslint-disable no-unused-vars*/
import React from 'react';
import { Card, CardActions, CardText, FlatButton, Paper, TextField, List, ListItem } from 'material-ui';

import PointCard from './point-card';
import { FormBlock } from '../block';
import RatingSelector from '../rating-selector';
/*eslint-enable no-unused-vars*/

import { bindAll } from 'lodash';
import history from '../../history';

const mockComments = [ {
  'user': 'gypsy',
  'rating': 0,
  'text': 'This place was a great... place.',
  'date': '2016-02-28T15:37:04.540Z'
}, {
  'user': 'cambot',
  'rating': 3,
  'text': '',
  'date': '2016-02-28T15:37:04.540Z'
}, {
  'user': 'tomservo',
  'rating': 3,
  'text': 'This place was okay',
  'date': '2016-02-28T15:37:04.540Z'
}, {
  'user': 'crow',
  'rating': 5,
  'text': 'This place smells like pepperoni... I love pepperoni!',
  'date': '2016-02-28T15:37:04.540Z'
} ];

export class RatingPointCard extends PointCard {
  constructor( props ) {
    super( props );
    bindAll( this, 'onComment' );
  }

  getCardState() {
    return 'point-card--rate';
  }

  getCardAction() {
    const goBack = history.goBack.bind( history );
    return <FlatButton label="Go Back" onClick={ goBack } />;
  }

  onCommentUpdate( event ) {
    const {setComment} = this.props;
    const comment = event.target.value;
    setComment( comment );
  }

  getCardContent() {
    return (
      <div className="point-card__content">
        { this.getCommentEntry() }
        { this.getCommentList() }
      </div>
      );
  }

  getCommentList() {
    const { point } = this.props;

    const comments = mockComments.map( comment => {
      const style = { fontSize: '16px' };
      const stars = (
        <RatingSelector disabled rating={ comment.rating }
          style={ style } />
      );
      const date = this.formatDateTimeString( comment.date );

      return (
        <ListItem key={ comment.user }
          primaryText={ comment.user }
          secondaryTextLines={ comment.text ? 2 : 1 }
          secondaryText={ (
            <span>
              { stars } { date }<br />
              { comment.text }
            </span>
          ) } />
      );
    } );

    return <List>{ comments }</List>;
  }

  onComment( values ) {
    const comment = {
      comment: values.comment,
      rating: values.rating,
      date: (new Date().toISOString())
    }
    console.log( comment );
  }

  getCommentEntry() {
    const fields = [ {
      rowClassName: 'comment-entry',
      row: [ {
        name: 'comment',
        hint: 'Your comment',
        className: 'comment-entry__comment'
      }, {
        name: 'rating',
        element: <RatingSelector />,
        className: 'comment-entry__rating'
      } ]
    } ];
    return (
      <FormBlock onAction={ this.onComment }
        thinActionButton
        zDepth={ 0 }
        actionText="Comment"
        fields={ fields } />
    );
  }

  // TODO: refactor this!
  formatDateTimeString( dateTimeString ) {
    const dateParts = dateTimeString.slice( 0, 10 ).split( '-' );
    return [ dateParts[ 1 ], dateParts[ 2 ], dateParts[ 0 ] ].join( '/' );
  }
}

export default RatingPointCard;
