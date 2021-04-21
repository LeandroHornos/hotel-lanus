import firebase from "firebase/app";
// import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKCeU2i15DsD9St75A_M1GHzxWUXMgseo",
  authDomain: "hotel-lanus.firebaseapp.com",
  projectId: "hotel-lanus",
  storageBucket: "hotel-lanus.appspot.com",
  messagingSenderId: "39633735270",
  appId: "1:39633735270:web:136d1baef976af0d83a7a7"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;