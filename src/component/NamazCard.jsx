import React from 'react'
import { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { IoMdCheckmark } from 'react-icons/io'

function NamazCard(props) {
  const [namazCount, setNamazCount] = useState(0)

  function HandleQuada() {
    setNamazCount(namazCount + 1)
  }

  function HandleComplete() {
    setNamazCount(namazCount - 1)
  }
  return (
    <div className='w-full flex flex-col justify-center items-center gap-8 p-6 rounded shadow-md bg-white'>
        <p className='text-2xl font-bold text-slate-800 text-center'>{props.name}</p>
        <p className='text-2xl font-bold text-slate-500 text-center'>RemainingNamaz: <span className='text-2xl font-bold text-orange-500 text-center'>{namazCount}</span></p>
      <div className='grid grid-cols-2 gap-4'>
        <button
          className='bg-blue-500 text-white py-2 px-6 rounded flex justify-center items-center gap-2 font-semibold'
          onClick={HandleQuada}
        >
          Quada <GrAdd size={19} />
        </button>
        <button
          className='bg-green-500 text-white py-2 px-6 rounded flex justify-center items-center gap-2 font-semibold'
          onClick={HandleComplete}
        >
          Complete <IoMdCheckmark size={19} />
        </button>
      </div>
    </div>
  )
}

export default NamazCard