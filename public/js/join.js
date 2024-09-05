import { auth } from '../../firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const errorText = document.querySelector('.errortext'); // 오류 메시지를 표시할 요소 선택

    // 오류 메시지를 초기화
    errorText.textContent = '';

    // 이메일 형식 검증
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        errorText.textContent = "올바른 이메일 형식을 입력해주세요.";
        return;  // 검증 실패 시 함수 종료
    }

    try {
        // Firebase에서 사용자 생성
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("회원가입 성공:", user);

        // 회원가입 성공 후 로그인 페이지로 리디렉션
        window.location.href = "../index.html";
    } catch (error) {
        // Firebase에서 발생한 오류 처리
        errorText.textContent = `회원가입 실패: ${error.message}`;
        console.error("회원가입 실패:", error.message);
    }
});
