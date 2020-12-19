import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import db from "../firebase";
import {  getUserInfoThunk } from "../redux/authentication";
import {setIsProfileFetching,getUserThunk} from "../redux/profile-reducer"




const IsAuthHoc = (Component) => {


    
  const NewComponent = (props) => {

    const [auth , setAuth] = useState(false);
    const history  = useHistory();


    useEffect(() => {
      db.auth().onAuthStateChanged((u) => {
        if (u) {
          props.getUserInfoThunk(u.uid);//auth
          props.getUserThunk(u.uid)//profile info
          props.setIsProfileFetching(true);
          setAuth(true)
          // history.replace('/profile')// every refresh set the 
        }else{
          setAuth(false)
        }
      
      });
    }, []);

  
   return <Component {...props} pageRedirect={auth} />  

  };


  return connect(null, { getUserInfoThunk,setIsProfileFetching ,getUserThunk})(NewComponent);
};

export default IsAuthHoc;
