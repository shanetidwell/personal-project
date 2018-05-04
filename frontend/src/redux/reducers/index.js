import { combineReducers } from 'redux'

import user from './user';
import userRequest from './userRequest';
import messages from './messages';
// import locations from './locations'
// import categories from './categories'

export default combineReducers({user, userRequest, messages})