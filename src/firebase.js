import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDA7EUacfAKpMmQSugSzkBXg8Mn5wIcpdQ",
  authDomain: "breeab-3218f.firebaseapp.com",
  databaseURL: "https://breeab-3218f.firebaseio.com",
  projectId: "breeab-3218f",
  storageBucket: "breeab-3218f.appspot.com",
  messagingSenderId: "385782157681",
  appId: "1:385782157681:web:927b770779b2a3072766d0",
  measurementId: "G-3E3C2WXX5Y",
};

const db = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

export default db;
