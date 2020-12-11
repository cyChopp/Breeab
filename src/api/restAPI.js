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
        if(u.user.uid){
          console.log(u.user.uid,"check")
        userAPI.setProfileInfo("","","","","",u.user.uid)
        }
      });
  },

  setUserAuthInfo(email, uid) {
    return db
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("auth")
      .doc('userAuthInfo')
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
      .get()
  },
};




//-------------- USER INFORMATION API -------------- 

export const userAPI = {

  getUserInfo(user) {
    return db
      .firestore()
      .collection("users")
      .doc(user)
      .get()
    },




    //   .catch(error => { // .catch() error arising from inviteDocument.ref.get()
    //     console.log(error,"error")
    //     throw new Error('Error: Getting document:');
    // })
    // .then(res=>{if(res != error){console.log('good')}else{console.log('bad')}})
    
    // .then(doc => {
    //     if (doc.exists) {
    //         const id = doc.id;
    //         var data = doc.data() as any;
    //         return {id, ...data};
    //     } else {
    //         throw new error('No such document!'); // can now be caught only by getInviteById's caller
    //     }
    // });

  setProfileInfo(fullname,username, status, location,image, uid) {
    console.log('in Procces!')
    return db.firestore().collection("users").doc(uid)
    .set({
      status: status,
      fullname: fullname,
      username:username,
      location: location,
      image:image
      
    });
  },

};


//-------------- USER POST API -------------- 

export const postsAPI = {

  addPost(fullname, username,time, postMessage,postImage,profile, uid) {
    return db.firestore().collection("posts").doc(uid).collection("userPosts")
      .add({
        fullname: fullname,
        username:username,
        time: time,
        text: postMessage,
        image: postImage,
        profile:profile
      });
  },

};

//        username: 'username',
