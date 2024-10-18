const apiKey = 'test_f55f990ba01a3db38ad251cbc28700067ca3b0ad0fa7af6ab748d3da6e7f98f9efe8d04';

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) return;

    try {
        // URL 인코딩 추가
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${encodedSearchTerm}`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': apiKey,
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
