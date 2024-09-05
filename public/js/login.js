import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
        // Firebase 로그인 시도
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("로그인 성공:", user);

        // 로그인 성공 후 main.html로 리디렉션
        window.location.href = "/page/main.html"; // main.html로 리디렉션
    } catch (error) {
        console.error("로그인 실패:", error.message);
    }
});
