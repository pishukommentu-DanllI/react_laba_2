import React from 'react'
import './Loader.css';
export const Loader = () => {
  return (
    <div className='ContanerLoader'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
