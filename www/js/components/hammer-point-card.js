import React, {Component} from 'react';
import Hammer from 'react-hammerjs';

// import redux components
import { connect } from 'react-redux';
import {  fullscreenMarker,
          peekMarker,
          deselectMarker } from '../actions/map_actions';

// import the PointCard
import PointCard from './point-card';

// export class for testing (use default export in application)
export class HammerPointCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightOffset: 0,
      changeScreen: false
    };
  }

  handleSwipe(e) {
    const { dispatch } = this.props;
    const pointDetails = document.getElementById('point-details');
    /* if we are at the top of the card, pulling down should shrink the card */
    if (this.props.show == "full") {
      // in full screen

      // because hammer onPanStart doesn't work,
      // just check if that time of the action was within 0.15s
      if ((pointDetails.scrollTop == 0) && (e.isFirst || e.deltaTime < 150)) {
        // you can change the screen state since you're at the top
        this.setState({changeScreen: true});
      }
      if ((pointDetails.scrollTop == 0) && this.state.changeScreen) {
        // at the top of the details
        this.setState({heightOffset: e.deltaY});
      }
      if (e.target.classList.contains("mdl-card__title") ||
          e.target.classList.contains("mdl-card__title-text")) {
        // at the top of the details
        this.setState({heightOffset: e.deltaY});
        this.setState({changeScreen: true});
      }
    } else {
      // in peek screen
      this.setState({changeScreen: true});
      this.setState({heightOffset: e.deltaY});
    }

    /* Change the screen size (to full, peek, or hide) */
    if (e.isFinal && this.state.changeScreen) {
      this.setState({heightOffset: 0, changeScreen: false});
      if (e.deltaY < -120) {
        dispatch(fullscreenMarker())
      } else if (e.deltaY > 120){
        if (this.props.show == "full") {
          dispatch(peekMarker())
        } else {
          dispatch(deselectMarker());
        }
      }
    }

  }

  render() {

    return (
      <Hammer vertical={true} onPanStart={this.handleSwipe.bind(this)}
                              onPan={this.handleSwipe.bind(this)}>
        <PointCard
          point={this.props.point}
          show={this.props.show}
          heightOffset={this.state.heightOffset}
          changeScreen={this.state.changeScreen}
        />
      </Hammer>
    );
  }
}

export default connect()(HammerPointCard);
