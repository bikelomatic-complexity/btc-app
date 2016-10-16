import { combineReducers } from 'redux';

import login from './login';
import registration from './registration';
import forgotPassword from './forgotPassword';

export { login, logout } from './login';
export { register } from './registration';
export { forgotPassword } from './forgotPassword';

export default combineReducers( { login, registration, forgotPassword } );
