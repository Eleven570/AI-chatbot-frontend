import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

function NotionStyleEditor() {
  const { id } = useParams()
  const [blocks, setBlocks] = useState([])

  const fileInputRef = useRef(null)

  // テキストブロックを追加する
  const addTextBlock = () => {
    setBlocks([...blocks, { id: Date.now(), type: 'text', content: '' }])
  }

  // コードブロックを追加する
  const addCodeBlock = () => {
    setBlocks([...blocks, { id: Date.now(), type: 'code', content: '' }])
  }

  // 「+画像」クリック時にアップロードをトリガー
  const triggerImageUpload = () => {
    fileInputRef.current.click()
  }

  // ブロックの内容を更新する
  const updateBlock = (id, newContent) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content: newContent } : block
    ))
  }

  // ブロックを削除する
  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id))
  }

  // 画像ファイルをアップロードして画像ブロックを追加
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setBlocks([...blocks, {
        id: Date.now(),
        type: 'image',
        content: reader.result
      }])
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex min-h-screen">
      {/* 左側メニュー欄 */}
      <div className="w-64 bg-gray-100 p-6 border-r">
        <h1 className="text-xl font-bold text-indigo-600 mb-6">
          📝 Notion風エディター（ID: {id}）
        </h1>

        {/* モジュール追加ボタン */}
        <div className="flex flex-col gap-4">
          <button onClick={addTextBlock} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">+ テキスト</button>
          <button onClick={addCodeBlock} className="bg-green-500 text-white py-2 rounded hover:bg-green-600">+ コード</button>
          <button onClick={triggerImageUpload} className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600">+ 画像</button>
        </div>

        {/* 非表示のファイル選択 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* 右側：コンテンツ表示エリア */}
      <div className="flex-1 bg-white p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto min-h-screen bg-white rounded-lg shadow-lg p-4">
          {blocks.length === 0 && (
            <p className="text-gray-400 text-center mt-40">＋ 左のボタンでブロックを追加してください</p>
          )}

          {blocks.map(block => (
            <div key={block.id} className="mb-8">
              {block.type === 'text' && (
                <textarea
                  className="w-full p-4 bg-gray-100 border rounded resize-y"
                  placeholder="テキストを入力..."
                  value={block.content}
                  onChange={e => updateBlock(block.id, e.target.value)}
                />
              )}
              {block.type === 'code' && (
                <textarea
                  className="w-full p-4 bg-gray-900 text-green-200 font-mono border rounded resize-y"
                  placeholder="コードを入力..."
                  value={block.content}
                  onChange={e => updateBlock(block.id, e.target.value)}
                />
              )}
              {block.type === 'image' && (
                <>
                  <p className="text-sm text-gray-600 mb-2">アップロード画像</p>
                  <img src={block.content} alt="アップロード画像" className="max-w-full h-auto rounded shadow" />
                </>
              )}

              {/* 削除ボタン */}
              <div className="text-right mt-2">
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  このブロックを削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotionStyleEditor