// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";

const API_KEY = import.meta.env.API_KEY;
const AUTH_DOMAIN = import.meta.env.AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.APP_ID;
const MEASUREMENT_ID = import.meta.env.MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
 