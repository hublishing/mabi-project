const displayItemDetails = (item) => {
    document.getElementById('itemName').textContent = item.item_display_name;
    document.getElementById('itemImage').src = item.image_url || ''; // API에서 이미지 URL이 있을 경우 사용
    document.getElementById('itemPrice').value = `${item.auction_price_per_unit} 골드`;
    document.getElementById('itemExpiration').value = new Date(item.date_auction_expire).toLocaleString(); // 경매 종료 날짜

    const itemOptions = document.getElementById('itemOptions');
    itemOptions.innerHTML = ''; // 이전 옵션 초기화

    item.item_option.forEach((option) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const optionNameDiv = document.createElement('div');
        optionNameDiv.className = 'option-name';
        optionNameDiv.textContent = option.option_type;

        const optionValueDiv = document.createElement('div');
        optionValueDiv.className = 'option-value';
        optionValueDiv.textContent = option.option_value;

        // option_value2가 존재하는 경우 추가
        if (option.option_value2) {
            optionValueDiv.textContent += `- ${option.option_value2}`; // 추가 정보 표시
        }

        optionDiv.appendChild(optionNameDiv);
        optionDiv.appendChild(optionValueDiv);
        itemOptions.appendChild(optionDiv);
    });

    document.getElementById('itemDetails').style.display = 'block'; // 상세 보기 표시
};
