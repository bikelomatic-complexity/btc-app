import { combineReducers } from 'redux';

import login from './login';
import registration from './registration';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';

export { login, logout } from './login';
export { register } from './registration';
export { forgotPassword } from './forgotPassword';
export { resetPassword } from './resetPassword'

export default combineReducers( { login, registration, forgotPassword, resetPassword } );
