import { createStore } from 'redux';

const actions = {
  LOGIN_USERNAME_CHANGE: 'LOGIN_USERNAME_CHANGE',
  LOGIN_PASSWORD_CHANGE: 'LOGIN_PASSWORD_CHANGE',
  LOGIN: 'LOGIN',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SIGNUP_USERNAME_CHANGE: 'SIGNUP_USERNAME_CHANGE',
  SIGNUP_PASSWORD_CHANGE: 'SIGNUP_PASSWORD_CHANGE',
  SIGNUP: 'SIGNUP',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
}

const initialState = {
  isLoggedIn: false,
  loginUsernameValue: '',
  loginPasswordValue: '',
  loginErrorMessage: '',
  signupUsernameValue: '',
  signupPasswordValue: '',
  signupErrorMessage: ''
}

const reducer = (state = initialState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case actions.LOGIN_USERNAME_CHANGE:
      return Object.assign({}, state, { loginUsernameValue: action.value });
    case actions.LOGIN_PASSWORD_CHANGE:
      return Object.assign({}, state, { loginPasswordValue: action.value });
    case actions.LOGIN: {
      return Object.assign({}, state, {
        loginUsernameValue: '',
        loginPasswordValue: '',
        isLoggedIn: true,
        loginErrorMessage: ''
      });
    }
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { loginErrorMessage: action.message });
    case actions.LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });
    case actions.SIGNUP_USERNAME_CHANGE:
      return Object.assign({}, state, { signupUsernameValue: action.value });
    case actions.SIGNUP_PASSWORD_CHANGE:
      return Object.assign({}, state, { signupPasswordValue: action.value });
    case actions.SIGNUP:
      return Object.assign({}, state, {
        signupPasswordValue: '',
        signupUsernameValue: '',
        signupErrorMessage: '',
        isLoggedIn: true
      });
    case actions.SIGNUP_FAILURE:
      return Object.assign({}, state, { signupErrorMessage: action.message });
    default: return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = {
  store: store,
  actions: actions
}
