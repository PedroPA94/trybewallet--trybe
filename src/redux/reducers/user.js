import USER_LOGIN from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  loggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      email: action.payload,
      loggedIn: true,
    };
  default:
    return state;
  }
};

export default userReducer;
