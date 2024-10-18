import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const apiKey = 'test_f55f990ba01a3db38ad251cbc28700067ca3b0ad0fa7af6ab748d3da6e7f98f9efe8d04';

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${searchTerm}`, {
        method: 'GET',
        headers: {
          'x-nxopen-api-key': apiKey,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setData(result.auction_item);
      } else {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <h1>게임 아이템 검색</h1>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="아이템 이름을 입력하세요" 
      />
      <button onClick={handleSearch}>검색</button>

      <div>
        {data.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item)}>
            {item.item_display_name} - {item.auction_price_per_unit} 골드
          </div>
        ))}
      </div>

      {selectedItem && (
        <div>
          <h2>상세 내용</h2>
          <p>아이템 이름: {selectedItem.item_name}</p>
          <p>가격: {selectedItem.auction_price_per_unit} 골드</p>
          {selectedItem.item_option.map((option, index) => (
            <div key={index}>
              <p>{option.option_type}: {option.option_value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
