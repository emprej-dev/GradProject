// backend/server.js
const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes'); // 라우트 불러오기

const app = express(); // 먼저 선언
const PORT = 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// ↓ 라우트 등록
app.use('/api', orderRoutes);

// 기본 라우트 (테스트용)
app.get('/', (req, res) => {
  res.send('✅ 백엔드 서버 정상 작동 중!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
