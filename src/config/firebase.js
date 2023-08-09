import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEQ8KvorNoG_f96cPF-mUn_MMkJRTGxi0",
  authDomain: "hello-22013.firebaseapp.com",
  projectId: "hello-22013",
  storageBucket: "hello-22013.appspot.com",
  messagingSenderId: "375930399461",
  appId: "1:375930399461:web:01518fab771e80d9c2c20c",
  measurementId: "G-RE9TN8TVVD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
