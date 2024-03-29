// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVD-9uduSW6gE9XGRipO2d5LZ3TFsXfSg",
  authDomain: "isekai-squad.firebaseapp.com",
  projectId: "isekai-squad",
  storageBucket: "isekai-squad.appspot.com",
  messagingSenderId: "211650440404",
  appId: "1:211650440404:web:896eb387a929b540401f41",
  measurementId: "G-WXY95CT1RC"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const storage = getStorage(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export {auth,storage,db}