import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import {  getUserInfoThunk } from "../redux/authentication";
import {setIsProfileFetching} from "../redux/profile-reducer"



const IsAuthHoc = (Component) => {


    
  const NewComponent = (props) => {


    const history  = useHistory();


    useEffect(() => {
      db.auth().onAuthStateChanged((u) => {
        if (u) {
          props.getUserInfoThunk(u.uid);
          props.setIsProfileFetching(true);// every refresh set the 
        }else{
          history.push('/signup')
        }
      });
    }, []);

    return <Component {...props} />;
  };

  return connect(null, { getUserInfoThunk,setIsProfileFetching })(NewComponent);
  // return connect(null,{setIsAuth})(NewComponent)
};

export default IsAuthHoc;
