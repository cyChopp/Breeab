import db from "../firebase";
import firebase from 'firebase';

//-------------- AUTHENTICATION API --------------
export const authAPI = {
  signOut() {
    return db.auth().signOut();
  },

  signUp(data, history) {
    return db
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((u) => {
        if (u.user.uid) {
          userAPI.setProfileInfo("Anonymous", "none", "", "", "", u.user.uid);
          authAPI.setUserAuthInfo(u.user.email, u.user.uid);
        }
      })
      .catch((error) => {
       return alert(error, "failed to sign up");
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
  addPost(
    fullname,
    username,
    time,
    postMessage,
    postImage,
    profile,
    status,
    uid
  ) {
    return db
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .add({
        fullname: fullname,
        username: username,
        time: time,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        text: postMessage,
        image: postImage,
        status: status,
        profile: profile,
      })
      .then(
        listAPI.addPostsList(
          fullname,
          username,
          time,
          postMessage,
          postImage,
          profile,
          status,
          uid
        )
      );
  },
};
//-------------- POSTS LIST API --------------
export const listAPI = {
  addPostsList(
    fullname,
    username,
    time,
    postMessage,
    postImage,
    profile,
    status,
    uid
  ) {
    return db.firestore().collection("postsList").add({
      fullname: fullname,
      username: username,
      time: time,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      text: postMessage,
      image: postImage,
      profile: profile,
      status: status,
      uid: uid,
    });
  },
};
