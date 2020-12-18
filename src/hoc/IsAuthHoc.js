import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import {  getUserInfoThunk } from "../redux/authentication";
import {setIsProfileFetching,getUserThunk} from "../redux/profile-reducer"




const IsAuthHoc = (Component) => {


    
  const NewComponent = (props) => {


    const history  = useHistory();


    useEffect(() => {
      db.auth().onAuthStateChanged((u) => {
        if (u) {
          props.getUserInfoThunk(u.uid);//auth
          props.getUserThunk(u.uid)//profile info
          props.setIsProfileFetching(true);
          return  history.replace('/profile')// every refresh set the 
        }else{
          history.push('/signup')
        }
      });
    }, []);

    return <Component {...props} />;
  };

  return connect(null, { getUserInfoThunk,setIsProfileFetching ,getUserThunk})(NewComponent);
  // return connect(null,{setIsAuth})(NewComponent)
};

export default IsAuthHoc;
