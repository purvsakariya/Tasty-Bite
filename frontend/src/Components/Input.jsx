import React from 'react'

function Input({label, id, ...props}) {
  return (
    <div className="control-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  )
}

export default Input

