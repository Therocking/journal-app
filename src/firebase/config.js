// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3AO0bUzv3V0QYZvf7ZLltsObXcYEzYCI",
  authDomain: "react-ce33c.firebaseapp.com",
  projectId: "react-ce33c",
  storageBucket: "react-ce33c.appspot.com",
  messagingSenderId: "866234754314",
  appId: "1:866234754314:web:336dfb9ddbf058683e86f3"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth( firebaseApp );

export const firestoreDB = getFirestore( firebaseApp )