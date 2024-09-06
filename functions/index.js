const functions = require('firebase-functions');
const fetch = require('node-fetch');

// Firebase Functions로 API 요청 중계
exports.fetchCoupons = functions.https.onRequest(async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.limit || 15;
    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const url = `http://www.sappun.co.kr/list/open_api.html?mode=search&type=smart_coupon&page=${page}&limit=${pageSize}&issue_type=DOWN&InquiryTimeFrom=${currentTime}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Shopkey': '5a4531b31b7204042db58179eb574369',
                'Licensekey': 'NzUwMTUzOTc3NDhlZTYyODEzYzRiMDI2YjZmNzQzYTU='
            }
        });
        const data = await response.json();
        res.json(data);  // 클라이언트에 응답 전송
    } catch (error) {
        res.status(500).json({ error: 'MakeShop API 요청 실패', details: error });
    }
});
