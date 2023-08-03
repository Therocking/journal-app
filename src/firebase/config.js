// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnviroments } from '../helper/gerEnvironments';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_API_KEY,
  VITE_APP_ID,
  VITE_AUTH_DOMAIN,
  VITE_MESSAGING_SENDER_ID,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
} = getEnviroments()


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  appId: VITE_APP_ID,
  authDomain: VITE_AUTH_DOMAIN,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
};


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth( firebaseApp );

export const firestoreDB = getFirestore( firebaseApp )