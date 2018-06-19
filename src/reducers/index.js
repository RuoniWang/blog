import { combineReducers } from 'redux';

import PostReducer from './post-reducer';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
  user: UserReducer,
});

export default rootReducer;
