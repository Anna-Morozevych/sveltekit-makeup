// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROGECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else{
  firebaseApp = getApp();
  deleteApp(firebaseApp);
  firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const colRef = collection(db, 'users');
export const ordersRef = collection(db, 'orders');
export const commentsRef = collection(db, 'comments');
export const messagesRef = collection(db, 'messages');
