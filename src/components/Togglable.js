import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hidden = (visible ? 'detailshidden' : props.shownStyle)
  const shown = (visible ? props.shownStyle : 'detailshidden')

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div id={hidden} onClick={toggleVisibility}>
        {props.showCollapsed}
      </div>
      <div id={shown} onClick={toggleVisibility}>
        {props.children}
      </div>
    </div>
  )
})

export default Togglable