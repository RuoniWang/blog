import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  post: {},
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({ all: action.all }, { post: state.post });
    case ActionTypes.FETCH_POST:
      return Object.assign({ post: action.post }, { all: state.all });
    default:
      return state;
  }
};

export default PostReducer;
