import React from 'react';
import './FeedWrapper.css'

const FeedWrapper =({children})=>{
    // alert(props.mobile)
    return (
        <div className='feed'>
            {children}
        </div>
    )
}

export default FeedWrapper
