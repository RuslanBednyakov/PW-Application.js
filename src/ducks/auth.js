import { appName } from '../config'
import { Record } from 'immutable'
import history from '../history'
import { push } from 'connected-react-router'
import * as API from '../api'
import * as Helper  from '../helpers'
import axios from 'axios'


export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  token: null
})

export const moduleName = 'auth'
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`
export const SET_USER_REQUEST = `${appName}/${moduleName}/SET_USER_REQUEST`
export const SET_USER_SUCCESS = `${appName}/${moduleName}/SET_USER_SUCCESS`
export const SET_USER_ERROR = `${appName}/${moduleName}/SET_USER_ERROR`

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload, error} = action;

  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
      return state.set('loading', true)

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case SET_USER_SUCCESS:
      console.log('Sign Succ', payload);
      const token = Helper.empty(payload) || Helper.empty(payload.token) ? null : payload.token;
      setAuthorizationToken(token);
      setResponseInterceptors ();
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('error', error)
        .set('isAuthenticated', !Helper.empty(token))
        .set('token', token)

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      console.log('state error', error)
      return state
        .set('loading', false)
        .set('error', error)

    case SET_USER_ERROR:
      console.log('reducer-logout');
      setAuthorizationToken();
      return new ReducerRecord().set('error', error)

    case SIGN_OUT_SUCCESS:
      console.log('reducer-logout');
      setAuthorizationToken();
      deleteResponseInterceptor();
      return new ReducerRecord()

    default: 
      return state;
  }
}

export const signUp = (data) => (dispatch) => {
  dispatch({
    type: SIGN_UP_REQUEST,
  })
  API.auth.signUp(data)
  .then(data => {
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: SIGN_UP_ERROR,
      error: err
    })
  })
}

export const signIn = (data) => (dispatch) => {
  dispatch({
    type: SIGN_IN_REQUEST,
  })
  API.auth.login(data)
  .then(data => {
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: SIGN_IN_ERROR,
      error: err
    })
  })
}

export const setUser = (token) => (dispatch) => {
  console.log('Set User Token', token);
  setAuthorizationToken (token);
  setResponseInterceptors ();
  API.auth.setUser()
  .then(data => {
    console.log('returned from axios', data)
    //check response
    dispatch({
      type: SET_USER_SUCCESS,
      payload: data
    })
  })
  .catch( err => {
    dispatch({
      type: SET_USER_ERROR,
      error: err
    })
  })
}



export function signOut() {
  // push('/auth/sign-in')
  return {
      type: SIGN_OUT_SUCCESS
    }
}

 function setAuthorizationToken(token) {

  if (Helper.empty(token)) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  } else {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token
  }
}

let checkTokenInterceptor;

function setResponseInterceptors() {
  
  checkTokenInterceptor = axios.interceptors.response.use(function (response) {
    console.log('axios interseptor response seccess')
    // Do something with response data
    return response;
  }, function (error) {
    console.log('axios interseptor response error', error.response.status)
    // Do something with response error
    if(error.response.status === 401) {
      localStorage.removeItem('token');
      console.log('axios interseptor response error push');
      history.push('/auth/sign-in');
    }
    return Promise.reject(error);
  });
}

function deleteResponseInterceptor() {
  axios.interceptors.response.eject(checkTokenInterceptor);
}