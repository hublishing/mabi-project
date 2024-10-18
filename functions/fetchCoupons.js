//fetchCoupons.js
exports.handler = async (event, context) => {
    const fetch = (await import('node-fetch')).default;
  
    const page = event.queryStringParameters.page || 1;
    const pageSize = event.queryStringParameters.limit || 15;
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
  
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',  // CORS 허용
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',  // CORS 허용
        },
        body: JSON.stringify({ error: 'MakeShop API 요청 실패', details: error }),
      };
    }
  };
  