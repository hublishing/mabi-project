import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrarj4xZaC_EqRcSzskaMhWY34C2J9buw",
  authDomain: "makeshop-project-146df.firebaseapp.com",
  projectId: "makeshop-project-146df",
  storageBucket: "makeshop-project-146df.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
