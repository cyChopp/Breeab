import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {setPostsListThunk} from "../redux/list-reducer"


const ListInfoHoc = (Component) => {

    const NewComponent = (props)=>{

        useEffect(() => {
            props.setPostsListThunk()

        }, [])

        return (
            <>
            <Component {...props}/>
            </>
        )
        
    }

    return connect(null,{setPostsListThunk})(NewComponent)

}

export default ListInfoHoc
