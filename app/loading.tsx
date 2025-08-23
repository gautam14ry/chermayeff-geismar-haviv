import React from 'react'
import Loader from './components/loader/Loader'

const Loading = () => {
  return (
    <div className="workCollection">
        <div className="content--container workCollection--container">
            <div className="content--container">
                <Loader />
            </div>
        </div>
    </div>
  )
}

export default Loading