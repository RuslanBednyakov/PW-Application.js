import emailValidator from 'email-validator'
import * as API from './api'

export const validate = ({email, userName, password, confirmPassword}) => {

  const errors = {};
  
  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if (!userName) errors.userName = 'please enter your name';

  if (!password) errors.password = 'password is required';
  else if (password.length < 4) errors.password = 'password is too short'

  if(!confirmPassword) errors.confirmPassword = 'please confirm your password';
  else if (password !== confirmPassword) errors.confirmPassword = "password doesn't match";

  return errors
}

export function empty (val) {
  return (typeof val === 'undefined' || val === '' || val === 0 || val === '0' || val === null
    || val === false || (typeof val === 'object' && !Object.keys(val).length) || (Array.isArray(val) && !val.length)
  )
}

export const asyncValidate = (values) => {
  console.log('asyncValidate', values)
  return API.auth.checkEmail(values)
    .then((response) => {
    if (response.message === 'This email already exists') {
      throw { email: 'This email already exists' }
    }
  })
}
