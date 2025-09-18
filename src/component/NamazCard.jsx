import React, { useState, useEffect } from 'react'
import { GrAdd } from 'react-icons/gr'
import logo from '../../public/checkmark.png'

function NamazCard({ name }) {

  const [namazCount, setNamazCount] = useState(3000)

  useEffect(() => {
    const savedCount = localStorage.getItem(`namaz_${name}`)
    if (savedCount) {
      setNamazCount(Number(savedCount))
    }
  }, [name])

  useEffect(() => {
    localStorage.setItem(`namaz_${name}`, namazCount)
  }, [namazCount, name])

  const handleQuada = () => {
    setNamazCount(prev => prev + 1)
  }

  const handleComplete = () => {
    setNamazCount(prev => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <div className={`w-full flex flex-col justify-center items-center gap-8 p-6 rounded shadow-md bg-white`}>
      <p className='text-2xl font-bold text-slate-800 text-center'>{name}</p>
      <p className='text-2xl font-bold text-slate-600 text-center'>
        RemainingNamaz:{' '}
        <span className='text-2xl font-bold text-orange-500 text-center'>
          {namazCount}
        </span>
      </p>
      <div className='grid grid-cols-2 gap-4'>
        <div
          onClick={handleQuada}
          className='bg-sky-600 text-white py-2 px-6 rounded flex justify-center items-center gap-2 font-semibold active:scale-95 transition-all duration-300 cursor-pointer'
        >
          <button>Quada</button>
          <p><GrAdd size={17} /></p>
        </div>
        <div
          onClick={handleComplete}
          className='bg-emerald-600 text-white py-2 px-6 rounded flex justify-center items-end gap-2 font-semibold active:scale-95 transition-all duration-300 cursor-pointer'
        >
          <button>Complete</button>
          <img src={logo} alt="Tick Mark" className='w-5 h-5 bg-white rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default NamazCard
