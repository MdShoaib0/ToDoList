import React, { useState, useEffect } from 'react'
import { GrAdd } from 'react-icons/gr'
import { IoMdCheckmark } from 'react-icons/io'

function NamazCard({ name }) {
  const [namazCount, setNamazCount] = useState(3000)

  // 🔄 Load saved count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem(`namaz_${name}`)
    if (savedCount) {
      setNamazCount(Number(savedCount))
    }
  }, [name])

  // 💾 Save count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`namaz_${name}`, namazCount)
  }, [namazCount, name])

  // ➕ Increase count
  const handleQuada = () => {
    setNamazCount((prev) => prev + 1)
  }

  // ✅ Decrease count (with lower bound check)
  const handleComplete = () => {
    setNamazCount((prev) => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <div className='w-full flex flex-col justify-center items-center gap-8 p-6 rounded shadow-md bg-white'>
      <p className='text-2xl font-bold text-slate-800 text-center'>{name}</p>

      <p className='text-2xl font-bold text-slate-500 text-center'>
        RemainingNamaz:{' '}
        <span className='text-2xl font-bold text-orange-500 text-center'>
          {namazCount}
        </span>
      </p>

      <div className='grid grid-cols-2 gap-4'>
        <div
        onClick={handleQuada}
        className='bg-blue-500 text-white py-2 px-6 rounded flex justify-center items-center gap-2 font-semibold active:scale-95 transition-all duration-300'>
          <button>Quada</button>
          <GrAdd size={19} />
        </div>

        <div
        onClick={handleComplete}
        className='bg-green-500 text-white py-2 px-6 rounded flex justify-center items-center gap-2 font-semibold active:scale-95 transition-all duration-300'>
          <button>Complete</button>
          <IoMdCheckmark size={19} />
        </div>
      </div>
    </div>
  )
}

export default NamazCard