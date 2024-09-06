import { auth } from '../../firebase.js';  
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// 로그인한 사용자 정보를 가져와서 페이지에 표시
onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email;
        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.textContent = `${email}`;
    } else {
        // 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = "../index.html";
    }
});

// 로그아웃 버튼 이벤트
document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        await signOut(auth);
        console.log('로그아웃 성공');
        window.location.href = "../index.html"; // 로그아웃 후 로그인 페이지로 리디렉션
    } catch (error) {
        console.error('로그아웃 실패:', error);
    }
});

// 사이드바 로드
fetch('/side.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebarContainer').innerHTML = data;
        initializeSidebar();  // 사이드바 관련 스크립트 초기화
    });

// 네비게이션 로드
fetch('/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navContainer').innerHTML = data;
        initializeNav();  // 네비게이션 관련 스크립트 초기화
    });

    
const checkBoxes = document.querySelectorAll('.checkbox input');

checkBoxes.forEach(c => {
    c.addEventListener("change", () => {
        const label = document.querySelector(`label[for="${c.name}"]`);
        if (c.checked) {
            label.style.color = '#1A1E20';  // 체크된 상태일 때 색상 변경
        } else {
            label.style.color = '#808487';  // 체크되지 않은 상태일 때 색상 변경
        }
    });
});

const sidebar = document.querySelector('.sidebar');
const menuBtn = document.getElementById('menuToggle');

menuBtn.addEventListener("click", () => {
    sidebar.style.left = "0px";  // 사이드바 열기
});

document.addEventListener("click", (event) => {
    const isClickInside = sidebar.contains(event.target) || menuBtn.contains(event.target);
    if (!isClickInside) {
        sidebar.style.left = "-235px";  // 사이드바 닫기
    }
});
