import React from 'react'

const Notification = (props) => {

  if (props.message !== null && props.message !== '') {
    if (props.class === "error") {
      return (
        <div className="error">{props.message}</div>
      )
    } else {
      return (
        <div className="success">{props.message}</div>
      )
    }
  } else {
    return null
  }

}

export default Notification