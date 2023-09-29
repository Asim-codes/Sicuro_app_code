// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBswiJ4rxwN7GTtB_ejOcSBpa216unAGe8",
  authDomain: "sicuro-2.firebaseapp.com",
  projectId: "sicuro-2",
  storageBucket: "sicuro-2.appspot.com",
  messagingSenderId: "412129288433",
  appId: "1:412129288433:web:3a92cbe3b3c9a2479f4950"
};


// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider =
	new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const db = firebase.database();
export const storage = firebase.storage();
export { firebase };

//update firestore settings
firestore.settings({
	timestampsInSnapshots: true,
	merge: true,
});
