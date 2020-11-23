import React from 'react'
import './Feed.css'
import PostContainer from './PostContainer'

function Feed() {
    return (
        <div className="feed " id="scroll--style">
            <div className="feed--header">
                <h2>Home</h2>
           </div>
           <PostContainer/> 
        </div>
    )
}

export default Feed
