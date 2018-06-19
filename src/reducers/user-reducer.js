import { ActionTypes } from '../actions';

const initialState = {
  me: {},
  posts: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return Object.assign({ me: action.user, posts: state.posts });
    case ActionTypes.FETCH_MY_POSTS:
      return Object.assign({ me: state.me, posts: action.posts });
    default:
      return state;
  }
};

export default UserReducer;
