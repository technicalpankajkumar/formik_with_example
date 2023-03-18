import React from 'react'

function TextError(props) {
  return (
    <div className='text-success'>{props.children}</div>
  )
}

export default TextError