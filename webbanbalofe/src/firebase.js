import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = { 
    apiKey : "AIzaSyDB6KYlahGhM5YN-TJmVgbM3cdFJ9bl2pY" , 
    authDomain : "webbalo-551d3.firebaseapp.com" , 
    projectId : "webbalo-551d3" , 
    storageBucket : "webbalo-551d3.appspot.com" , 
    messagingSenderId : "409612715720" , 
    appId : "1:409612715720:web:871267823811eddf9687fd" , 
    measurementId : "G-6B813XTJE2" 
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

export { storage, app };