import React, {Component} from 'react';
import { Card, CardMedia, CardTitle, CardActions,
  FontIcon, CardText, RaisedButton, Paper, TextField } from 'material-ui';
import RatingSelector from './rating-selector';

export class RatingPointCard extends Component {

  onSubmit() {
    const { newRating, newComment } = this.props;
    // TODO: submit this comment
    console.log(`rating: ${newRating.rating}`);
    console.log(`comment: ${newRating.comment}`);
    console.log(`date: ${new Date().toJSON()}`)
  }

  onCommentUpdate(event) {
    const {setComment} = this.props;
    const comment = event.target.value;
    setComment(comment);
  }

  render() {
    const { peekMarker, deselectMarker, point,
      setRating, newRating, setComment } = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;
    let smallHeight;

    if (point.coverUrl) {
      backgroundStyle = `url(${point.coverUrl}) center / cover`;
      titleHeight = '176px';
      smallHeight = 300 - this.props.heightOffset;
    }
    else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
      smallHeight = 224 - this.props.heightOffset;
    }

    const headerHeight = Math.max(64,  64 + this.props.heightOffset);
    const headerHeightCSS = `calc(100% - ${headerHeight}px)`;
    const smallHeightCSS = `${smallHeight}px`;
    let cardStyle = {
      width: '100%',
      position: 'fixed',
      bottom: '0px',
      height: headerHeightCSS,
      transition: 'all 300ms ease',
      zIndex:'8',
      overflowY:'auto'
    }

    let cardTitleStyle = {
      color: '#fff',
      height: titleHeight,
      background: backgroundStyle,
      margin: '0px !important'
    }

    let seeButton = (
      <RaisedButton
        secondary
        label="See Less"
        onClick={() => {
          peekMarker();
        }}
      />
    );

    const mockComments = [
      {
        'user': "gypsy",
        'rating': 0,
        'text': "This place was a great... place.",
        'date': "2016-02-28T15:37:04.540Z"
      },
      {
        'user': "cambot",
        'rating': 3,
        'text': "",
        'date': "2016-02-28T15:37:04.540Z"
      },
      {
        'user': "tomservo",
        'rating': 3,
        'text': "This place was okay",
        'date': "2016-02-28T15:37:04.540Z"
      },
      {
        'user': "crow",
        'rating': 5,
        'text': "This place smells like pepperoni... I love pepperoni!",
        'date': "2016-02-28T15:37:04.540Z"
      }
    ]

    let commentElements = (<Paper>
      <CardText style={{fontSize:'27px', textAlign:'center'}}>
        There are no comments for this service yet.
      </CardText>
    </Paper>);

    // TODO: swap with mockComments with point.comments
    if (mockComments.length !== 0) {
      commentElements = mockComments.map( comment => {
        let stars = <span />
        if (comment.rating > 0) {
          stars = <RatingSelector disabled={true} rating={comment.rating}
                                  style={{fontSize:'14px'}}/>
        }
        const starElement = (<span style={{verticalAlign:'sub'}}>
          {stars}
        </span>);

        const date = comment.date.slice(0,10).split('-');
        const dateString = [date[1], date[2], date[0]].join('/');

        const dateElement = (<span>{dateString}</span>);

        let commentElement = <span key={comment.user} />
        if (comment.text !== "") {
          commentElement = (<Paper key={comment.user}>
            <CardText style={{fontSize:'27px'}}>
              {comment.user}
            </CardText>
            <div style={{fontSize:'12px', paddingLeft:'16px'}}>
              {starElement} {dateElement}
            </div>
            <CardText style={{fontSize:'16px'}}>
              {comment.text}
            </CardText>
          </Paper>)
        }
        return commentElement;
      });
    }

    const newComment = (<Paper>
      <div style={{padding:'16px'}}>
        <div>
          <RatingSelector setRating={setRating.bind(this)}
            rating={newRating.rating}
            style={{fontSize:'40px'}} />
        </div>
        <div>
          <TextField  onBlur={this.onCommentUpdate.bind(this)}
                      fullWidth={true}
                      multiLine={true} rows={2} rowsMax={4}
                      hintText="New Comment" />
        </div>
        <div>
          <RaisedButton label="Submit Comment"
                        onClick={this.onSubmit.bind(this)}/>
        </div>
      </div>
    </Paper>);

    return (
      <Card id="mdl-map-card" className="form-column" style={cardStyle}>
        <CardMedia className="hammer-grab" overlay={
          <CardTitle className="hammer-grab" title={point.name}/>
        }>
          <div style={cardTitleStyle} />
        </CardMedia>
        <div style={{margin:'8px', marginBottom:'64px'}}>
          { commentElements }
          { newComment }
        </div>
        <CardActions className="form-row view-buttons">
          { seeButton }
          <RaisedButton
            onClick={() => {
              deselectMarker();
            }}
            label="Close"
          />
        </CardActions>
      </Card>
    );
  }
}

export default RatingPointCard;
