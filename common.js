// Import Firebase SDK and required services
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AlzaSyDrarj4xZaC_EqRcSzskaMhWY34C2J9buw", // Your web API key
  authDomain: "makeshop-project-146df.firebaseapp.com", // Usually in the form of PROJECT_ID.firebaseapp.com
  projectId: "makeshop-project-146df", // Your project ID
  storageBucket: "makeshop-project-146df.appspot.com" // Usually in the form of PROJECT_ID.appspot.com
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
