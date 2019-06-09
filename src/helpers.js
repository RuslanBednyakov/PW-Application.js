import emailValidator from 'email-validator';

const validate = ({email, password}) => {
  const errors = {};
  
  if (!email) errors.email = 'email is required';
  else if (!emailValidator.validate(email)) errors.email = 'invalid email';

  if (!password) errors.password = 'password is required';
  else if (password.length < 4) errors.password = 'password is too short'

  return errors
}

export default validate