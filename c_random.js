document.getElementById('get-coupon').addEventListener('click', function(e) {
    e.preventDefault(); // 기본 링크 동작 방지

    // 슬롯 초기화
    const slots = document.querySelectorAll('.slot');
    slots.forEach(slot => {
        slot.textContent = '0';
    });

    // 슬롯머신 애니메이션 효과
    let spinCount = 0;
    const interval = setInterval(() => {
        slots.forEach(slot => {
            const randomNum = Math.floor(Math.random() * 10); // 0-9 사이 랜덤 숫자
            slot.textContent = randomNum;
        });
        spinCount++;
        if (spinCount >= 3) { // 3번 회전 후 멈춤
            clearInterval(interval);
            const result1 = parseInt(slots[0].textContent, 10);
            const result2 = parseInt(slots[1].textContent, 10);
            if (result1 === result2) {
                document.getElementById('result').textContent = '축하합니다! 쿠폰이 지급되었습니다.';
            } else {
                document.getElementById('result').textContent = '다시 시도하세요!';
            }
        }
    }, 1000); // 1초마다 슬롯 변경
});
