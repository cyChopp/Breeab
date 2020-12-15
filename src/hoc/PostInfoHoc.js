import { CircularProgress } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {getUserThunk} from "../redux/profile-reducer"


const mapStateToProps =(state)=>({
    isInfoLoaded :state.profile.isInfoLoaded,
    currentUserId:state.auth.currentUserId
})

const PostInfoHoc = (Component) => {

    const NewComponent = (props)=>{


        useEffect(() => {
            props.getUserThunk(props.currentUserId)
            
        }, [])

        return (
            <>
            <Component {...props}/>
            {/* {props.isInfoLoaded ? ( <Component {...props}/>) : ( <div className="preloader__Wrapper">
                                            <CircularProgress color="secondary" size={20} />
                                                    </div>)
            } */}
            </>
        )
        
    }

    return connect(mapStateToProps,{getUserThunk})(NewComponent)

}

export default PostInfoHoc
