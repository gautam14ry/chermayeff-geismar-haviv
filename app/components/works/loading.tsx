import React from 'react'
import Loader from '../loader/Loader'
import PreContent from '../preconnect/PreContent'

const Loading = () => {
  return (
    <main id="home" className="pageType-workCollection main--loading">
        <div className="workCollection">
            <div className="content--container workCollection--container">
                <div className="preContent">
                    <div className="waitingForThumbnails">
                        <PreContent filterType='logo' />
                    </div>
                </div>
                <div className="content--container">
                    <Loader />
                </div>
            </div>
        </div>
    </main>
  )
}

export default Loading