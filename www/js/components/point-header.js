import React, {Component} from 'react';
import { CardMedia, CardTitle, IconMenu,
  MenuItem, FontIcon, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

export class PointHeader extends Component {

  updatePoint() {
    const id = this.props.point._id;
    const urlId = encodeURIComponent(id);
    this.props.history.push(`/update-point/${urlId}`);
  }

  ratePoint() {
    const id = this.props.point._id;
    const urlId = encodeURIComponent(id);
    this.props.history.push(`/rate-point/${urlId}`);
  }

  flagPoint() {
    //TODO
  }

  render() {
    const { point } = this.props;

    // if we have an image, use that
    // otherwise, use an mdl-blue for the title,
    // and make the card a bit smaller
    let backgroundStyle;
    let titleHeight;

    if (point.coverUrl) {
      backgroundStyle = `url(${point.coverUrl}) center / cover`;
      titleHeight = '176px';
    }
    else {
      backgroundStyle = '#3f51b5';
      titleHeight = '100px';
    }

    const cardTitleStyle = {
      color: '#fff',
      height: titleHeight,
      background: backgroundStyle,
      margin: '0px !important'
    }

    const iconStyle = {
      zIndex:1, float:"right",
      background: "rgba(0,0,0,0.6)",
      borderRadius: "100%"
    };

    return (
      <CardMedia className="hammer-grab" overlay={
        <CardTitle className="hammer-grab" title={point.name}/>
      }>
        <div style={cardTitleStyle}>
          <IconMenu
            style={iconStyle}
            iconButtonElement={<IconButton>
              <MoreVertIcon color="white"/>
            </IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem
              primaryText="Update Information"
              onClick={this.updatePoint.bind(this)} />
            <MenuItem
              primaryText="Rate Service"
              onClick={this.ratePoint.bind(this)} />
            <MenuItem
              primaryText="Flag Service"
              onClick={this.flagPoint.bind(this)} />
          </IconMenu>
        </div>
      </CardMedia>
    );
  }
}

export default PointHeader;
