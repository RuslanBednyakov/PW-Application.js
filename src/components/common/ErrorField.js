import React from 'react'
import PropTypes from 'prop-types'

function ErrorField(props) {
  const {input, type, label, meta: {error, touched}} = props;
  const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>;
  return (
    <div>
      <label className="sign-in__container_label">{label}</label>
      <input {...input} placeholder={label} type={type} />
      {errorText}
    </div>
  )
}

ErrorField.propTypes = {

}

export default ErrorField

