import React, { useState } from 'react'
import db from './firebase';

import { Redirect } from 'react-router-dom';



const PrivateRoute = (children) => {


    const [auth,setAuth]=useState(false)

    db.auth().onAuthStateChanged((u) => {
        if(u){
          setAuth(true)

        }else{
         setAuth(false)
        }
         })

      

    return (
        <>
       {auth ? ({children}):(<Redirect to="/signup" />)}
        </>
    )
}

export default PrivateRoute;
