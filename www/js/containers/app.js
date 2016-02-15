import React, {Component} from 'react';
import ACDrawer from '../components/ac-drawer';
import { Paper } from 'material-ui';
import { connect } from 'react-redux';

// actions
import { setDrawer } from '../reducers/drawer';

/**
 * the App component fetches service data from the server and displays
 * a map with points for each service. Fetching hapens upon mount.
 */
export class App extends Component {
  render() {
    const { dispatch } = this.props;

    const childrenWithActions = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        setDrawer: newTitle => {dispatch(setDrawer(newTitle))}
      })
    });

    return (
      <Paper style={{height:'100%'}}>
        <ACDrawer history={this.props.history} page={this.props.drawer}/>
        <Paper style={{height:'calc(100% - 64px)'}}>
          {childrenWithActions}
        </Paper>
      </Paper>
    );
  }
}

function select(state) {
  return {
    drawer: state.drawer
  };
}

export default connect(select)(App);
