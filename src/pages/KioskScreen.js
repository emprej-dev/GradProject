import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../src/styles/KioskScreen.css';
import Learning from '../../src/components/Learning';

function KioskScreen() {
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('coffee');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [cartPage, setCartPage] = useState(0);

  const [showInfo, setShowInfo] = useState(false); // 💡 알아보기 박스 on/off
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0); // 💡 현재 정보 번호

  // 💡 표시할 정보 목록
  const infoList = [
  "1️⃣ 원하는 메뉴를 누르면 장바구니에 담을 수 있습니다.",
  "2️⃣ 장바구니에서 메뉴를 삭제하거나 결제하기 버튼을 누를 수 있습니다.",
  "3️⃣ 결제 수단을 선택한 후 카드나 카카오페이를 선택하여 결제를 완료하면 주문이 끝납니다!"
];


  const itemsPerPage = 5;

  const menu = {
    coffee: [
      { name: '아메리카노', price: 4000, img: '/images/keopiwa-keopi-kong-eulo-gadeug-yuli.jpg' },
      { name: '카페라떼', price: 4500, img: '/images/mas-issneun-pumjil-ui-keopi-keob.jpg' },
      { name: '카푸치노', price: 4500, img: '/images/has-latte-keopi-keob.jpg' },
      { name: '에스프레소', price: 3500, img: '/images/espresso.jpg' },
      { name: '바닐라라떼', price: 5000, img: '/images/vanillalatte.jpg' },
      { name: '카라멜마끼아또', price: 5000, img: '/images/caramelmacchiato.jpg' },
      { name: '모카', price: 5000, img: '/images/coffee-6274506_640.jpg' },
      { name: '콜드브루', price: 4500, img: '/images/coldbrew.jpg' },
    ],
    beverage: [
      { name: '초코라떼', price: 4500, img: '/images/chocolatte.jpg' },
      { name: '녹차라떼', price: 4500, img: '/images/green-tea-latte-2647523_1280.jpg' },
      { name: '레몬에이드', price: 4000, img: '/images/lemonade-6210157_1280.jpg' },
      { name: '자몽에이드', price: 4000, img: '/images/grapefruit-9715105_1280.jpg' },
      { name: '밀크티', price: 4500, img: '/images/hongwei-fan-2kkxilGY8GA-unsplash.jpg' },
      { name: '청포도에이드', price: 4000, img: '/images/KakaoTalk_20251123_143053439.jpg' },
    ],
    dessert: [
      { name: '치즈케이크', price: 5000, img: '/images/new-york-cheese-cake-7500156_1280.jpg' },
      { name: '쿠키', price: 2000, img: '/images/cookie-7736938_1280.jpg' },
      { name: '마카롱', price: 2500, img: '/images/macarons-1850216_1280.jpg' },
      { name: '브라우니', price: 3000, img: '/images/brownie-548591_1280.jpg' },
      { name: '타르트', price: 4000, img: '/images/tart-1283822_1280.jpg' },
      { name: '푸딩', price: 3500, img: '/images/berries-6514669_1280.jpg' },
      { name: '젤라또', price: 4500, img: '/images/ice-cream-5928048_1280.jpg' },
      { name: '와플', price: 4000, img: '/images/waffles-7007465_1280.jpg' },
    ],
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = (item) => setSelectedItems([...selectedItems, item]);

  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handlePay = () => {
    if (selectedItems.length === 0) return;
    setShowPaymentOptions(true);
  };

  const handleCardPayment = async () => {
    try {
      //await axios.post('http://localhost:5000/api/orders', { items: selectedItems });
      await axios.post('https://gradproject-backend.onrender.com/api/orders', { items: selectedItems });
      alert('💳 카드 결제 완료!');
      setShowPaymentOptions(false);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('카드 결제 실패:', error);
      alert('결제 중 오류가 발생했습니다.');
    }
  };

  const handleKakaoPay = async () => {
    try {
      //await axios.post('http://localhost:5000/api/orders', { items: selectedItems });
      await axios.post('https://gradproject-backend.onrender.com/api/orders', { items: selectedItems });
      alert('🟡 카카오페이 결제 완료!');
      setShowPaymentOptions(false);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('카카오페이 결제 실패:', error);
      alert('결제 중 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedItems([]);
  };

  const startIdx = cartPage * itemsPerPage;
  const paginatedItems = selectedItems.slice(startIdx, startIdx + itemsPerPage);

  // 💡 다음 정보 보기
  const handleNextInfo = () => {
    if (currentInfoIndex < infoList.length - 1) {
      setCurrentInfoIndex(currentInfoIndex + 1);
    } else {
      setShowInfo(false); // 마지막이면 자동 닫기
      setCurrentInfoIndex(0);
    }
  };

  return (
    <div className="kiosk-container">

      {/* 상단 버튼 */}
      <div className="top-buttons">
        <button className="voice-btn" onClick={() => alert('음성 기능 준비 중')}>🔊</button>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ 뒤로</button>
        <button className="home-btn" onClick={() => navigate('/')}>🏠 홈</button>
        <button className="contact-btn" onClick={() => navigate('/faq')}>❓ 문의</button>
        <button className="info-btn" onClick={() => setShowInfo(true)}>ℹ️ 알아보기</button>
      </div>

      <h1 className="kiosk-title">☕ 키오스크 주문하기</h1>

      {/* 💡 알아보기 박스 */}
      {showInfo && (
        <div className="info-box">
          <p>{infoList[currentInfoIndex]}</p>
          <div className="info-buttons">
            <button onClick={handleNextInfo}>다음 ▶</button>
            <button onClick={() => setShowInfo(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 카테고리 */}
      <div className="category-buttons">
        {Object.keys(menu).map((cat) => (
          <button
            key={cat}
            className={currentCategory === cat ? 'active' : ''}
            onClick={() => setCurrentCategory(cat)}
          >
            {cat === 'coffee' ? '커피' : cat === 'beverage' ? '음료' : '디저트'}
          </button>
        ))}
      </div>

      {/* 메뉴 리스트 */}
      <div className="menu-list">
        {menu[currentCategory].map((item) => (
          <div key={item.name} className="menu-item" onClick={() => handleAddItem(item)}>
            <img src={item.img} alt={item.name} />
            <div className="menu-name">{item.name}</div>
            <div className="menu-price">{item.price}원</div>
          </div>
        ))}
      </div>

      {/* 장바구니 */}
      <div className="cart">
        <h3>🛒 장바구니</h3>

        {selectedItems.length === 0 ? (
          <p>선택한 메뉴가 없습니다.</p>
        ) : (
          <>
            <ul>
              {paginatedItems.map((item, i) => (
                <li key={i}>
                  {item.name} ({item.price}원)
                  <button onClick={() => handleRemoveItem(startIdx + i)}>❌</button>
                </li>
              ))}
            </ul>

            <div className="pagination-buttons">
              <button
                onClick={() => setCartPage(Math.max(cartPage - 1, 0))}
                disabled={cartPage === 0}
              >
                ◀ 이전
              </button>

              <button
                onClick={() =>
                  setCartPage(
                    Math.min(
                      cartPage + 1,
                      Math.ceil(selectedItems.length / itemsPerPage) - 1
                    )
                  )
                }
                disabled={startIdx + itemsPerPage >= selectedItems.length}
              >
                다음 ▶
              </button>
            </div>
          </>
        )}

        {selectedItems.length > 0 && (
          <button className="pay-button" onClick={handlePay}>
            결제하기 ({totalPrice}원)
          </button>
        )}
      </div>

      {/* 결제창 */}
      {showPaymentOptions && (
        <div className="modal">
          <div className="modal-content">
            <h2>결제 수단을 선택하세요</h2>
            <button className="card-btn" onClick={handleCardPayment}>💳 카드 결제</button>
            <button className="kakao-btn" onClick={handleKakaoPay}>🟡 카카오페이</button>
            <button onClick={() => setShowPaymentOptions(false)}>취소</button>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ 결제 완료!</h2>
            <p>감사합니다 😊</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KioskScreen;
