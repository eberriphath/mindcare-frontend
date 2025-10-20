import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
    <h1 className="text-5xl font-bold text-blue-600 mb-6">
      Tailwind is Working 🎉
    </h1>
    <button
      onClick={() => setCount(count + 1)}
      className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition"
    >
      Count is {count}
    </button>
  </div>
);

}

export default App
