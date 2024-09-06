import { db, auth } from '../../firebase.js';    // Firebase 설정에서 Firestore 및 auth 객체 가져오기
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// 위젯 생성 후 Firebase에 저장하는 함수
function saveWidgetToFirebase(widgetData) {
    addDoc(collection(db, "widgets"), widgetData)
        .then((docRef) => {
            console.log("위젯이 성공적으로 저장되었습니다. 문서 ID:", docRef.id);
            alert('위젯이 저장되었습니다.');
        })
        .catch((error) => {
            console.error("위젯 저장 중 오류 발생:", error);
            alert('위젯 저장 중 오류가 발생했습니다.');
        });
}

// 페이지 로드 시 쿠폰 목록 불러오기
function loadCoupons() {
    fetch('https://makeshop.api.url/coupons', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
        }
    })
    .then(response => response.json())
    .then(data => {
        const couponTableBody = document.querySelector('#couponTable tbody');
        couponTableBody.innerHTML = ''; // 이전 데이터 초기화
        data.forEach(coupon => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${coupon.id}</td>
                <td>${coupon.name}</td>
                <td>${coupon.description}</td>
                <td><input type="checkbox" value="${coupon.id}"></td>
            `;
            couponTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('쿠폰 목록을 불러오는 중 오류 발생:', error);
    });
}

// 위젯 생성 후 화면에 표시 및 Firebase에 저장
document.getElementById('generateWidgetButton').addEventListener('click', function() {
    const isVisible = document.getElementById('widgetVisibility').checked;
    const title = document.getElementById('widgetTitle').value;
    const css = document.getElementById('widgetCSS').value;
    const js = document.getElementById('widgetJS').value;
    const selectedCoupons = Array.from(document.querySelectorAll('#couponTable tbody input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    if (!isVisible) {
        alert('위젯이 비활성화되었습니다.');
        return;
    }

    // 위젯 데이터를 저장할 객체 생성
    const widgetData = {
        isVisible,
        title,
        selectedCoupons,
        css,
        js,
        createdAt: new Date(),
        userId: auth.currentUser.uid // 현재 로그인한 사용자 ID
    };

    // Firebase에 저장
    saveWidgetToFirebase(widgetData);

    // 위젯을 화면에 생성하고 미리보기 보여주기
    generateWidget();
    previewWidget();
});

// 위젯 생성 함수
function generateWidget() {
    const isVisible = document.getElementById('widgetVisibility').checked;
    const title = document.getElementById('widgetTitle').value;
    const css = document.getElementById('widgetCSS').value;
    const js = document.getElementById('widgetJS').value;
    const selectedCoupons = Array.from(document.querySelectorAll('#couponTable tbody input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // 기존 위젯 및 스타일 제거
    const existingWidget = document.getElementById('customWidget');
    if (existingWidget) {
        existingWidget.remove();
    }
    const existingStyle = document.querySelector('style[data-widget-style]');
    if (existingStyle) {
        existingStyle.remove();
    }
    const existingScript = document.querySelector('script[data-widget-script]');
    if (existingScript) {
        existingScript.remove();
    }

    // 새 위젯 생성
    const widget = document.createElement('div');
    widget.id = 'customWidget';
    widget.innerHTML = `<h2>${title}</h2><p>선택된 쿠폰: ${selectedCoupons.join(', ')}</p>`;

    // 사용자 정의 CSS 적용
    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-widget-style', 'true');
    document.head.appendChild(style);

    // 사용자 정의 JavaScript 적용
    const script = document.createElement('script');
    script.textContent = js;
    script.setAttribute('data-widget-script', 'true');
    document.body.appendChild(script);

    document.body.appendChild(widget);
}

// 위젯 미리보기 함수
function previewWidget() {
    const previewContainer = document.getElementById('widgetPreview');
    const title = document.getElementById('widgetTitle').value;
    const selectedCoupons = Array.from(document.querySelectorAll('#couponTable tbody input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    previewContainer.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px;">
            <h2>미리보기: ${title}</h2>
            <p>선택된 쿠폰: ${selectedCoupons.join(', ')}</p>
        </div>
    `;
}

// Firestore에서 위젯 리스트 불러오기
function loadWidgetList() {
    const widgetListContainer = document.getElementById('widgetList');
    widgetListContainer.innerHTML = '';  // 리스트 초기화

    getDocs(collection(db, "widgets"))
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const widget = doc.data();
                const listItem = document.createElement('li');
                listItem.textContent = widget.title;
                listItem.addEventListener('click', () => {
                    showWidgetDetails(widget);
                });
                widgetListContainer.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("위젯 목록 불러오기 실패:", error);
        });
}

// 위젯 클릭 시 상세 정보 표시
function showWidgetDetails(widget) {
    const widgetDetailContainer = document.getElementById('widgetDetails');
    widgetDetailContainer.innerHTML = `
        <h2>${widget.title}</h2>
        <p>선택된 쿠폰: ${widget.selectedCoupons.join(', ')}</p>
        <style>${widget.css}</style>
        <script>${widget.js}</script>
    `;
}

// 페이지 로드 시 쿠폰 목록 및 위젯 목록 불러오기
document.addEventListener('DOMContentLoaded', function() {
    loadCoupons();
    loadWidgetList();
});
