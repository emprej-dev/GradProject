// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();

// 가짜 데이터 저장소 (DB 대신)
let orders = [];

// 주문 추가 (POST) → /api/orders
router.post('/orders', (req, res) => {
  console.log('POST 요청 데이터:', req.body); // 요청 데이터 확인
  const newOrder = req.body; // { items: [{name, price, quantity}, ...] }
  orders.push(newOrder);
  res.status(201).json({ message: '주문이 등록되었습니다!', order: newOrder });
});

// 모든 주문 조회 (GET) → /api/orders
router.get('/orders', (req, res) => {
  res.json(orders);
});

// 모든 주문 초기화 (DELETE) → /api/orders
router.delete('/orders', (req, res) => {
  orders = [];
  res.json({ message: '모든 주문이 삭제되었습니다.' });
});

// 특정 주문 삭제 (DELETE) → /api/orders/:index
router.delete('/orders/:index', (req, res) => {
  const { index } = req.params;
  if (orders[index]) {
    orders.splice(index, 1);
    res.json({ message: '주문 삭제 완료' });
  } else {
    res.status(404).json({ message: '해당 주문이 없습니다.' });
  }
});

// 주문 수정 (수량 변경) → /api/orders/:index (PATCH)
router.patch('/orders/:index', (req, res) => {
  const { index } = req.params;
  const { items } = req.body; // items: [{name, price, quantity}, ...]
  if (orders[index]) {
    orders[index].items = items;
    res.json({ message: '주문 수정 완료', order: orders[index] });
  } else {
    res.status(404).json({ message: '해당 주문이 없습니다.' });
  }
});

module.exports = router;