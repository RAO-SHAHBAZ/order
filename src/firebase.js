import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh9l9-EfERZ4PkplKf7MVxPe5_mR0i56s",
  authDomain: "post-job-3d44e.firebaseapp.com",
  projectId: "post-job-3d44e",
  storageBucket: "post-job-3d44e.firebasestorage.app",
  messagingSenderId: "1043918250461",
  appId: "1:1043918250461:web:8ba01716c00f8d5010d634",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);