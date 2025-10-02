import React, { useState, useEffect } from 'react'
import { GrAdd } from 'react-icons/gr'
import logo from '../../public/checkmark.png'
import Logo1 from '../../public/pen.png'
import Logo2 from '../../public/checked.png'

function NamazCard({ name }) {
  const [namazCount, setNamazCount] = useState(0)
  const [edit, setEdit] = useState(false);
  const [newNamazCount, setNewNamazCount] = useState(0);

  // Load saved count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem(`namaz_${name}`)
    if (savedCount) {
      setNamazCount(Number(savedCount))
    }
  }, [name])

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem(`namaz_${name}`, namazCount)
  }, [namazCount, name])

  const handleQuada = () => {
    setNamazCount(prev => prev + 1)
  }

  const handleEdit = () => {
    if (edit) {
      // Save and exit edit mode
      setNamazCount(Number(newNamazCount));
      setEdit(false);
    } else {
      // Enter edit mode with current value
      setNewNamazCount(namazCount);
      setEdit(true);
    }
  }

  const handleComplete = () => {
    setNamazCount(prev => (prev > 0 ? prev - 1 : 0))
  }

  const handleNamazCount = (event) => {
    setNewNamazCount(Number(event.target.value));
  }

  return (
    <div className="w-full flex flex-col relative justify-center items-center gap-8 p-6 rounded-lg shadow-md bg-white">
      
      {/* Edit / Save Button */}
      <div onClick={handleEdit} className="absolute top-4 right-4 cursor-pointer">
        {!edit ? (
          <div className="flex items-center gap-1.5 bg-slate-200 px-2 py-0.5 rounded shadow">
            <img className="w-4 h-4" src={Logo1} alt="edit" />
            <p className="text-sm font-medium">Edit</p>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-slate-200 px-2 py-0.5 rounded shadow">
            <img className="w-4 h-4" src={Logo2} alt="save" />
            <p className="text-sm font-medium">Save</p>
          </div>
        )}
      </div>

      {/* Input when editing */}
      {edit && (
        <input
          value={newNamazCount}
          onChange={handleNamazCount}
          className="w-16 absolute top-16 right-4 h-7 outline-0 px-2 rounded bg-gray-100"
          type="number"
        />
      )}

      <p className="text-2xl font-bold text-slate-800 text-center">{name}</p>
      <p className="text-2xl font-bold text-slate-600 text-center">
        Remaining Namaz:{' '}
        <span className="text-2xl font-bold text-orange-500 text-center">
          {namazCount}
        </span>
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={handleQuada}
          className="bg-blue-700 text-white py-2.5 px-6 rounded-lg flex justify-center items-center gap-2 font-semibold active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <button>Quada</button>
          <p><GrAdd size={17} /></p>
        </div>
        <div
          onClick={handleComplete}
          className="bg-emerald-500 text-white py-2.5 px-6 rounded-lg flex justify-center items-center gap-2 font-semibold active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <button>Complete</button>
          <img src={logo} alt="Tick Mark" className="w-5 h-5 bg-white rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default NamazCard