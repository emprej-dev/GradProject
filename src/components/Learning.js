// src/pages/Learning.js
import React from 'react';

const Learning = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-8">학습하기</h1>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('kiosk')}
          className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-600"
        >
          자율학습
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-md cursor-not-allowed">
          문의하기
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-md cursor-not-allowed">
          퀴즈
        </button>
        <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl shadow-md cursor-not-allowed">
          단계학습
        </button>
      </div>
    </div>
  );
};

export default Learning;
