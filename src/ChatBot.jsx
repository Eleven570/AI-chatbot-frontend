import React, { useState } from 'react'
import axios from 'axios'

function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const apiUrl = import.meta.env.VITE_API_URL
      const res = await axios.post(`${apiUrl}/chat`, { message: input })
      const botMessage = { role: 'assistant', content: res.data.reply }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'エラーが発生しました。' },
      ])
    }
  }

  return (
    <div className="w-80 h-[32rem] flex flex-col bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">ChatBot</h2>
      <div className="flex-1 overflow-y-auto border p-2 mb-2 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-1 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded text-sm ${
                msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-1">
        <input
          className="flex-1 border border-gray-300 bg-white text-black placeholder-gray-400 rounded px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="メッセージを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          送信
        </button>
      </form>
    </div>
  )
}

export default ChatBot