import React, {Component} from 'react';
import { Card, CardMedia, CardTitle, CardActions,
  FontIcon, CardText, RaisedButton, Paper, TextField } from 'material-ui';
import RatingSelector from './rating-selector';

export class RatingPointCard extends Component {

  render() {
    const { peekMarker, deselectMarker, point,
      setRating, newRating } = this.props;

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
        user:'Ted',
        rating:4,
        text:'This place was great!'
      },
      {
        user:'Bill',
        rating:5,
        text:"This place was most excellent!"
      },
      {
        user:'Ned',
        rating:4.5,
        text:"Fantasticarino!"
      },
      {
        user:'Homer',
        rating:2.5,
        text:"Needs more donuts..."
      }
    ]

    const comments = mockComments.map( comment => {
      const stars = <RatingSelector disabled={true}
                                    rating={comment.rating} />

      return (<Paper key={comment.user}>
        <CardText style={{fontSize:'27px'}}>
          {comment.user} {stars}
        </CardText>
        <CardText>
          {comment.text}
        </CardText>
      </Paper>);
    });

    const newComment = (<Paper>
      <div style={{padding:'16px'}}>
      <div>
        <RatingSelector setRating={setRating.bind(this)}
          rating={newRating.rating}
          style={{fontSize:'40px'}} />
      </div>
      <div>
        <TextField  multiLine={true} rows={2} rowsMax={4}
                    floatingLabelText="New Comment" />
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
          { comments }
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
