// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrarj4xZaC_EqRcSzskaMhWY34C2J9buw",
    authDomain: "makeshop-project-146df.firebaseapp.com",
    projectId: "makeshop-project-146df",
    storageBucket: "makeshop-project-146df.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // auth 객체 초기화
const db = getFirestore(app);  // Firestore 객체 초기화

export { auth, db };  // auth와 db를 export
