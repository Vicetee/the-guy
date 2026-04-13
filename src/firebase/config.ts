// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  
const firebaseConfig = {
  apiKey: "AIzaSyBpEKGsYrsgXa4p_0F7BLX3DUs_TqSDnTM",
  authDomain: "my-guy-dd4f7.firebaseapp.com",
  projectId: "my-guy-dd4f7",
  storageBucket: "my-guy-dd4f7.firebasestorage.app",
  messagingSenderId: "517693817597",
  appId: "1:517693817597:web:a6994f6958d70b0712f494",
  measurementId: "G-QXWR8WJE9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 