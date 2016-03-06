import { combineReducers } from 'redux';

import dialog from './dialog';
import snackbar from './snackbar';

export { setDialog, closeDialog } from './dialog';
export { setSnackbar, closeSnackbar } from './snackbar';

export default combineReducers( { dialog, snackbar } );
