import db from "../firebase";
import React from "react";

//-------------- AUTHENTICATION API --------------
export const authAPI = {
  signOut() {
    return db.auth().signOut();
  },

  signUp(data) {
    return db
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((u) => {
        authAPI.setUserAuthInfo(u.user.email, u.user.uid);
        if (u.user.uid) {
          console.log(u.user.uid, "check");
          userAPI.setProfileInfo("", "", "", "", "", u.user.uid);
        }
      });
  },

  setUserAuthInfo(email, uid) {
    return db
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("auth")
      .doc("userAuthInfo")
      .set({
        email: email,
        userId: uid,
      });
  },

  getUserAuthInfo(uid) {
    return db
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("auth")
      .doc("userAuthInfo")
      .get();
  },
};

//-------------- USER INFORMATION API --------------

export const userAPI = {
  getUserInfo(user) {
    return db.firestore().collection("users").doc(user).get();
  },
  setProfileInfo(fullname, username, status, location, image, uid) {
    console.log("in Procces!");
    return db.firestore().collection("users").doc(uid).set({
      status: status,
      fullname: fullname,
      username: username,
      location: location,
      image: image,
    });
  },
};

//-------------- USER POST API --------------

export const postsAPI = {
  addPost(fullname, username, time, postMessage, postImage, profile, uid) {
    return db
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .add({
        fullname: fullname,
        username: username,
        time: time,
        text: postMessage,
        image: postImage,
        profile: profile,
      })
      .then(
        listAPI.addPostsList(fullname,username,time,postMessage,postImage,profile,uid)

      
      )
  }
  
};
//-------------- POSTS LIST API --------------
export const listAPI = {
  addPostsList(fullname,username,time,postMessage,postImage,profile,uid){
    console.log(fullname,username, time, postMessage, postImage,profile, uid,"::::::::")
    return  db
        .firestore()
        .collection("postsList")
        .add(
          {
            fullname: fullname,
            username: username,
            time: time,
            text: postMessage,
            image: postImage,
            profile: profile,
            uid:uid
          }
        )
    }
}
