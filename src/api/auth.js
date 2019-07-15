import api from '../sevices/api';

export function login (auth) {
  return api.post('auth/sign-in', auth)
    .then((r) => r.data)
    .catch( err => { 
      console.log('api error', err)
      throw err } )
}

export function signUp (auth) {
  return api.post('auth/sign-up', auth)
    .then((r) => {
      return r.data
    })
    .catch( err => { throw err } )
}

export function setUser () {
  return api.get('user')
    .then((r) => r.data)
    .catch( err => { throw err } )
}

export function checkEmail (email) {
  return api.post('auth/check', email)
}