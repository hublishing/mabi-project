const apiKey = 'test_f55f990ba01a3db38ad251cbc28700067ca3b0ad0fa7af6ab748d3da6e7f98f9efe8d04e6d233bd35cf2fabdeb93fb0d';

// 최근 등록된 아이템을 가져오는 함수
const fetchRecentItems = async () => {
    try {
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?auction_item_category=검`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'Accept': 'application/json', // Accept 헤더 추가
            },
        });
        const result = await response.json();

        if (response.ok) {
            displayItems(result.auction_item.slice(0, 10)); // 최근 10개 아이템 표시
        } else {
            console.error(result.error.message);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
};

// 검색 버튼 클릭 시 아이템 검색
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) return;

    try {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${encodedSearchTerm}`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
                'Accept': 'application/json', // Accept 헤더 추가
            },
        });
        const result = await response.json();

        if (response.ok) {
            displayItems(result.auction_item);
        } else {
            console.error(result.error.message);
        }
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
    }
});

// 아이템 표시 함수
const displayItems = (items) => {
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
    document.getElementById('itemName').textContent = `아이템 이름: ${item.item_name}`;
    document.getElementById('itemPrice').textContent = `가격: ${item.auction_price_per_unit} 골드`;

    const itemOptions = document.getElementById('itemOptions');
    itemOptions.innerHTML = ''; // 이전 옵션 초기화
    item.item_option.forEach((option) => {
        const optionDiv = document.createElement('div');
        optionDiv.textContent = `${option.option_type}: ${option.option_value}`;
        itemOptions.appendChild(optionDiv);
    });

    document.getElementById('itemDetails').style.display = 'block';
};

// 페이지 로드 시 가장 최근 등록된 상품 표시
document.addEventListener('DOMContentLoaded', fetchRecentItems);
