import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import './PostContainer.css'

function PostContainer() {
    return (
        <div className="post">
        <form>
            <div className="post--input">
                <Avatar className="profile"/>
                <input type="text"/>

            </div>
            <Button className="post--button">Post</Button>
        </form>
            
        </div>
    )
}

export default PostContainer
