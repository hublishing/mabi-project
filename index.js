const fetchRecentItems = async () => {
    console.log('최근 아이템을 가져오는 중...');
    try {
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?auction_item_category=검`, {
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
