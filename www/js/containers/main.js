import React, {Component} from 'react';
import ACDrawer from '../components/ac-drawer';
import { Paper, Dialog, FlatButton } from 'material-ui';
import { connect } from 'react-redux';

// actions
import { setDrawer } from '../reducers/drawer';
import { setDialog, closeDialog } from '../reducers/dialog';

/**
 * the App component fetches service data from the server and displays
 * a map with points for each service. Fetching hapens upon mount.
 */
export class App extends Component {

  onActionTap(tapHandler){
    const { dispatch } = this.props;

    if (tapHandler) {tapHandler();}
    dispatch(closeDialog());
  }

  makeDialogButton({keyboardFocused, label, primary, secondary, disabled, tapHandler}){
    return (
      <FlatButton
        label={label}
        keyboardFocused={keyboardFocused}
        secondary={secondary}
        primary={primary}
        disabled={disabled}
        onTouchTap={this.onActionTap.bind(this, tapHandler)}
      />);
  }

  render() {
    const { dispatch } = this.props;

    const childrenWithActions = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        setDrawer: newTitle => {dispatch(setDrawer(newTitle))},
        setDialog: dialog => {dispatch(setDialog(dialog))}
      })
    });

    return (
      <Paper style={{height:'100%'}}>
        <ACDrawer history={this.props.history} page={this.props.drawer}/>
        <Paper style={{height:'calc(100% - 64px)'}}>
          {childrenWithActions}
        </Paper>
        <Dialog
          title={this.props.dialog.title}
          actions={
            this.props.dialog.actions.map((button)=>{return this.makeDialogButton(button)})
          }
          onRequestClose={this.onActionTap.bind(this)}
          modal={this.props.dialog.modal}
          open={this.props.dialog.open}
        >
          {this.props.dialog.description}
        </Dialog>
      </Paper>
    );
  }
}

function select(state) {
  return {
    drawer: state.drawer,
    dialog: state.dialog
  };
}

export default connect(select)(App);
