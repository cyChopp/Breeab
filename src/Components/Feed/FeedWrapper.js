import React from 'react';
import './FeedWrapper.css'

const FeedWrapper =({children})=>{
    return (
        <div className='feed'>
            {children}
        </div>
    )
}

export default FeedWrapper
