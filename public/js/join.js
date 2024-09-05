import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
        // Firebase에서 사용자 생성
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("회원가입 성공:", user);

        // 회원가입 성공 후 로그인 페이지로 리디렉션
        window.location.href = "../index.html"; // 로그인 페이지로 이동
    } catch (error) {
        console.error("회원가입 실패:", error.message);
    }
});
