/*eslint-disable no-unused-vars*/
import React from 'react';
import { Card, CardActions, CardText, FlatButton, Paper, TextField, List, ListItem } from 'material-ui';

import PointCard from './point-card';
import { FormBlock } from '../block';
import RatingSelector from '../rating-selector';
/*eslint-enable no-unused-vars*/

import { bindAll } from 'lodash';
import history from '../../history';

import uuid from 'node-uuid';
import { Service } from 'btc-models';

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
    return <FlatButton label="Go Back"
             onTouchTap={ goBack } />;
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
    const comments = this.point.comments.map( comment => {
      const style = { fontSize: '16px' };
      const stars = (
      <RatingSelector disabled
        rating={ comment.rating }
        style={ style } />
      );
      const date = this.formatDateTimeString( comment.date );

      return (
        <ListItem key={ comment.uuid }
          primaryText={ comment.user }
          secondaryTextLines={ comment.text ? 2 : 1 }
          secondaryText={ (
            <span>{ stars } { date } <br /> { comment.text }</span>
          ) } />
        );
    } );

    return (
      <List>
        { comments }
      </List>
      );
  }

  onComment( values ) {
    const { updateService } = this.props;
    const comment = {
  		// TODO: Set the first name and last initial of the user (keeping in mind they might not be logged in).
    	user: "Anonymous",
    	date: new Date().toISOString(),
		text: values.comment,
		rating: values.rating,
		uuid: uuid.v1()
    };
    // TODO: Is it legit to mutate this point here???
    this.point.comments.push(comment);
    const service = new Service( this.point );
    service.update();
    if (service.isValid()) {
    	updateService(service);
    }
    else {
    	console.log("TODO: This comment is not valid; we should show the user an error here.");
    }
  }

  getCommentEntry() {
    // See the FormBlock class in block.js for how this tree works.
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
