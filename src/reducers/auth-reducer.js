import { ActionTypes } from '../actions';


const initialState = {
  authenticated: false,
  err_msg: '',
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, err_msg: '' };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, err_msg: action.message };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, err_msg: '' };
    default:
      return state;
  }
};

export default AuthReducer;
