// src/components/Clock.jsx
import { useEffect, useState } from 'react'

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('ja-JP', { hour12: false })

  return (
    <div className="w-full flex justify-center mt-6">
  <div className="w-80 h-20 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl flex items-center justify-center text-4xl text-black font-mono">
    🕒 {formattedTime}
  </div>
</div>
  )
}

export default Clock