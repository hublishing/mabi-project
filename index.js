// API 키
const apiKey = 'test_f55f990ba01a3db38ad251cbc28700067ca3b0ad0fa7af6ab748d3da6e7f98f9efe8d04';
 
// 최근 등록된 아이템을 가져오는 함수
const fetchRecentItems = async () => {
    console.log('최근 아이템을 가져오는 중...');
    try {
        // 카테고리 없이 전체 데이터 요청
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'Accept': 'application/json',
            },
        });
        const result = await response.json();
        console.log('API 응답:', result); // API 응답 로그

        if (response.ok) {
            displayItems(result.auction_item.slice(0, 10)); // 최근 10개 아이템 표시
        } else {
            console.error('오류:', result.error.message);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};


// 검색 버튼 클릭 시 아이템 검색
document.getElementById('searchButton').addEventListener('click', async () => {
    console.log('검색 버튼 클릭됨'); // 로그 추가
    const searchTerm = document.getElementById('searchInput').value.trim();
    console.log('검색어:', searchTerm);
    if (!searchTerm) return;

    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        console.log('인코딩된 검색어:', encodedSearchTerm); // 인코딩된 검색어 로그

        // API 호출을 통해 아이템을 검색
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${encodedSearchTerm}`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'Accept': 'application/json',
            },
        });
        const result = await response.json();
        console.log('API 응답:', result); // API 응답 로그

        if (response.ok) {
            // 검색 결과를 표시
            displayItems(result.auction_item);
        } else {
            console.error('오류:', result.error.message);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
});

// 아이템 표시 함수
const displayItems = (items) => {
    console.log('아이템 표시 중...'); // 아이템 표시 로그
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // 이전 아이템 초기화

    items.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.item_display_name} - ${item.auction_price_per_unit} 골드`;
        itemDiv.addEventListener('click', () => displayItemDetails(item));
        itemList.appendChild(itemDiv);
    });
};

// 아이템 상세 정보 표시
const displayItemDetails = (item) => {
    console.log('아이템 상세 정보 표시 중:', item); // 상세 정보 표시 로그
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
            optionValueDiv.textContent += ` - ${option.option_value2}`; // 추가 정보 표시
        }

        optionDiv.appendChild(optionNameDiv);
        optionDiv.appendChild(optionValueDiv);
        itemOptions.appendChild(optionDiv);
    });

    document.getElementById('itemDetails').style.display = 'block'; // 상세 보기 표시
};

// 페이지 로드 시 가장 최근 등록된 상품 표시
document.addEventListener('DOMContentLoaded', fetchRecentItems);
