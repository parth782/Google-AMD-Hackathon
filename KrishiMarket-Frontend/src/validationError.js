import React from 'react'

export default function ValidationError(props) {
  if(props.message) {
    return (
      <div className="error">
      <p className="input-error">{props.message}</p>
      </div>
    );
  }
  return <></>
  
}