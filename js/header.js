console.log("header.js 파일이 로드되었습니다.");

// Firestore와 Authentication 객체는 전역에서 사용
const db = window.db;
const auth = window.auth;

// 데이터 폼 제출 이벤트 처리 (Firestore에 데이터 저장)
document.addEventListener('DOMContentLoaded', function() {
    const widgetForm = document.getElementById('widgetForm');
    
    if (widgetForm) {
        widgetForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // 로그인된 사용자 확인
            const user = window.auth.currentUser;
            if (user) {
                const uid = user.uid;

                // 폼 데이터 가져오기
                const inquiryTimeFrom = document.getElementById('inquiryTimeFrom').value;
                const inquiryTimeTo = document.getElementById('inquiryTimeTo').value;
                const inquiryType = document.getElementById('inquiryType').value;
                const issueType = document.getElementById('issueType').value;
                const purpose = document.getElementById('purpose').value;
                const limit = document.getElementById('limit').value;
                const fields = document.getElementById('fields').value;

                // Firestore에 데이터 저장 (사용자 UID 포함)
                window.db.collection('widgets').add({
                    userId: uid, // 로그인된 사용자의 UID 저장
                    inquiryTimeFrom,
                    inquiryTimeTo,
                    inquiryType,
                    issueType,
                    purpose,
                    limit,
                    fields
                })
                .then(() => {
                    console.log("Document successfully written!");
                    alert("위젯이 생성되었습니다!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            } else {
                alert("로그인이 필요합니다.");
            }
        });
    }
});

// 회원가입 처리
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 폼 기본 동작 중단

    console.log("회원가입 버튼 클릭됨");  // 콘솔 로그 추가

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    console.log("입력된 이메일:", email);  // 이메일 로그 확인
    console.log("입력된 비밀번호:", password);  // 비밀번호 로그 확인

    if (email && password) {
        window.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("회원가입 성공:", userCredential.user);
                alert("회원가입 성공!");
            })
            .catch((error) => {
                console.error("회원가입 실패:", error.message);
                alert(`Error: ${error.message}`);
            });
    } else {
        alert("이메일과 비밀번호를 입력해주세요.");
    }
});

// 로그인 처리
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log("로그인 시도 - 이메일:", email);  // 콘솔 로그로 로그인 시도 확인

    window.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("로그인 성공:", userCredential.user);  // 콘솔 로그로 성공 확인
            alert("로그인 성공!");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("로그인 실패:", errorMessage);
            alert(`Error: ${errorMessage}`);
        });
});

// 로그인 상태 변화 감지
window.auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('로그인 상태 - 사용자 이메일:', user.email);  // 로그인된 사용자 정보 확인
        document.getElementById('loggedInContent').style.display = 'block';
        document.getElementById('loggedOutContent').style.display = 'none';
        document.getElementById('userEmail').innerText = user.email;
    } else {
        console.log('로그아웃 상태');  // 로그아웃 상태 확인
        document.getElementById('loggedInContent').style.display = 'none';
        document.getElementById('loggedOutContent').style.display = 'block';
    }
});

// 로그아웃 처리
document.getElementById('logoutButton').addEventListener('click', () => {
    window.auth.signOut().then(() => {
        console.log("로그아웃 성공");
        alert("로그아웃 성공!");
    }).catch((error) => {
        console.error("로그아웃 실패:", error);
    });
});

// 로그인 폼을 보여주는 함수 (로그아웃 상태일 때)
function showLoginForm() {
    alert("로그인 폼을 보여줍니다.");
}
