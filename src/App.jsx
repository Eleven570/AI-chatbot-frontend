// 📁 src/App.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBot from './ChatBot'
import Clock from './components/Clock'
import './index.css'

function App() {
  const [showBot, setShowBot] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="w-screen min-h-screen bg-gray-50 text-gray-900">
      {/* ⏰ 時計（中央上部に表示） */}
      <div className="w-full flex justify-center pt-6">
        <Clock />
      </div>

      {/* 🔵 ヘッダー（左上タイトル） */}
      <header className="absolute top-4 left-6">
        <h1 className="text-xl font-bold text-indigo-600">私のAI展示サイト</h1>
      </header>

      {/* 🟢 カード表示エリア */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/detail/1')}
          className="cursor-pointer bg-white shadow rounded p-4 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold">2024年1月の課題</h2>
          <p className="text-sm mt-2 text-gray-600">タイトル、内容、リンクなど...</p>
        </div>
      </main>

      {/* 🟡 フッター */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © 2025 私のAI展示プロジェクト
      </footer>

      {/* 🔴 チャットボット起動ボタン（右下、丸型フローティング） */}
      <button
        onClick={() => setShowBot(!showBot)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center text-xl"
      >
        💬
      </button>

      {showBot && (
        <div className="fixed bottom-24 right-6 z-50">
          <ChatBot />
        </div>
      )}
    </div>
  )
}

export default App
