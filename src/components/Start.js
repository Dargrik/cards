import React from 'react'
import { useNavigate } from "react-router-dom";

const Start = () => {

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  }

  return (
    <div className='start-page'>
      <div className='start-button' onClick={() => routeChange("/categories")}>
        <p>START</p>
      </div>

      <div className='bottom-left-svg'>
        <img src="/assets/start/bottom-left.svg" alt="" />
      </div>

      <div className='top-right-svg'>
        <img src="/assets/start/top-right.svg" alt="" />
      </div>

    </div>
  )
}

export default Start
