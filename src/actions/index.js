import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // authentication
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  FETCH_MY_POSTS: 'FETCH_MY_POSTS',
};

export function fetchUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, user: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchMyPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/myPosts`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log(response);
      dispatch({ type: ActionTypes.FETCH_MY_POSTS, posts: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, all: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      console.log(response);
      dispatch({ type: ActionTypes.FETCH_POST, post: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    console.log('deleting');
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => { history.push('/'); })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePost(id, field) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, field, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, post: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPost(field, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, field, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => { history.push('/'); })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  return (dispatch) => { // have to return a thunk method
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token); // set local storage after dispatch the action
        history.push('/');
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          dispatch(authError('You must fill in both email and password!'));
        } else if (error.response.status === 401) {
          dispatch(authError('Sign In Failed: your email or password is invalid!'));
        }
      });
  };
}
export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
      .then((response) => {
        console.log(`sign up response: ${response}`);
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch((error) => {
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      });
  };
}
export function signoutUser(history) {
  console.log('signout method called');
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
export function resetError() {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: '',
  };
}
