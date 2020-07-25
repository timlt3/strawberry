import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Initialize Cloud Firestore through Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAeImqKSwBwjyE-Kn7q2orAj1hznMzvIQM",
  authDomain: "strawberry-170e8.firebaseapp.com",
  databaseURL: "https://strawberry-170e8.firebaseio.com",
  projectId: "strawberry-170e8",
  storageBucket: "strawberry-170e8.appspot.com",
  messagingSenderId: "956863983339",
  appId: "1:956863983339:web:b7b28d56094028603818ae",
  measurementId: "G-J4HM7TWS8F"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;