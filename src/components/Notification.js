import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notMessage, notClass }) => {

  if (notMessage !== null && notMessage !== '') {
    if (notClass === 'error') {
      return (
        <div className="error">{notMessage}</div>
      )
    } else {
      return (
        <div className="success">{notMessage}</div>
      )
    }
  } else {
    return null
  }

}

Notification.propTypes = {
  notMessage: PropTypes.string,
  notClass: PropTypes.string
}

export default Notification