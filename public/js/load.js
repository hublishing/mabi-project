document.addEventListener("DOMContentLoaded", () => {
    // 사이드바 로드
    fetch('/page/side.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`사이드바 로드 실패: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('sidebarContainer').innerHTML = data;
            initializeSidebar();  // 사이드바 관련 스크립트 초기화
        })
        .catch(error => {
            console.error('사이드바 로드 중 오류 발생:', error);
        });

    // 네비게이션 로드
    fetch('/page/nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`네비게이션 로드 실패: ${response.status} - ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navContainer').innerHTML = data;
            initializeNav();  // 네비게이션 관련 스크립트 초기화
        })
        .catch(error => {
            console.error('네비게이션 로드 중 오류 발생:', error);
        });
 
});



// 사이드바와 네비게이션 관련 스크립트 초기화 함수들
function initializeSidebar() {
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

    // 체크박스 이벤트
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
}

function initializeNav() {
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
}
 

document.addEventListener("DOMContentLoaded", () => {
    // 현재 페이지의 마지막 경로 추출 (예: main.html, coupon.html)
    const currentPage = window.location.pathname.split('/').pop();

    // 모든 사이드바 항목 가져오기
    const menuItems = document.querySelectorAll('.side-nav .item');

    // 각 메뉴 항목 순회
    menuItems.forEach(item => {
        const link = item.querySelector('a').getAttribute('href').split('/').pop();  // 메뉴 항목의 마지막 경로만 추출
        
        // 현재 페이지 URL의 마지막 경로와 메뉴 항목의 href가 일치하면 active 클래스 추가
        if (link === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');  // 일치하지 않으면 active 클래스 제거
        }
    });
});
