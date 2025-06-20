// src/App.jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatBot from './ChatBot'
import './index.css'

function App() {
  const [showBot, setShowBot] = useState(false)

  return (
    <div className="relative w-screen h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="h-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-600">Vite + React + Tailwind</h1>
      <h2 className="text-2xl font-semibold text-green-600 mt-4">
        Tailwind 样式加载成功！
      </h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        onClick={() => alert('功能按钮')}
      >
        示例按钮
      </button>

      {/* ✅ 悬浮按钮 */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-600 text-white text-xl shadow-lg hover:bg-indigo-700"
        onClick={() => setShowBot(!showBot)}
      >
        💬
      </button>

      {/* ✅ 悬浮弹窗 */}
      {showBot && (
        <div className="fixed bottom-24 right-6 z-50">
          <ChatBot />
        </div>
      )}
    </div>
  )
}

export default App