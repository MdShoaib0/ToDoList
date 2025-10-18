import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { FiEdit, FiSave } from 'react-icons/fi'
import { IoCheckmarkDone } from 'react-icons/io5'
import { FaPrayingHands } from 'react-icons/fa'

function NamazCard({ name }) {
  const [namazCount, setNamazCount] = useState(0)
  const [edit, setEdit] = useState(false)
  const [newNamazCount, setNewNamazCount] = useState(0)

  const handleQuada = () => {
    setNamazCount(prev => prev + 1)
  }

  const handleEdit = () => {
    if (edit) {
      setNamazCount(Number(newNamazCount))
      setEdit(false)
    } else {
      setNewNamazCount(namazCount)
      setEdit(true)
    }
  }

  const handleComplete = () => {
    setNamazCount(prev => (prev > 0 ? prev - 1 : 0))
  }

  const handleNamazCount = (event) => {
    setNewNamazCount(Number(event.target.value))
  }

  const getCountColor = () => {
    if (namazCount === 0) return 'text-green-600'
    if (namazCount <= 5) return 'text-orange-500'
    return 'text-red-600'
  }

  const getCardGradient = () => {
    if (namazCount === 0) return 'from-green-50 to-emerald-100'
    if (namazCount <= 5) return 'from-orange-50 to-amber-100'
    return 'from-red-50 to-rose-100'
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaPrayingHands className="text-3xl text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">Namaz Tracker</h1>
          <FaPrayingHands className="text-3xl text-green-600" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your daily prayers and manage Qada prayers with ease. Stay consistent in your spiritual journey.
        </p>
      </div>

      <div className={`w-full flex flex-col relative justify-center items-center gap-8 p-8 rounded-2xl shadow-lg bg-gradient-to-br ${getCardGradient()} border-2 border-white/50 backdrop-blur-sm`}>
        
        {/* Edit/Save Button */}
        <div onClick={handleEdit} className="absolute top-6 right-6 cursor-pointer group">
          {!edit ? (
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow-md hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
              <FiEdit className="text-blue-600" />
              <p className="text-sm font-semibold text-gray-700">Edit Count</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-xl shadow-md hover:bg-green-600 transition-all duration-300">
              <FiSave className="text-white" />
              <p className="text-sm font-semibold text-white">Save</p>
            </div>
          )}
        </div>

        {/* Input when editing */}
        {edit && (
          <div className="absolute top-20 right-6">
            <input
              value={newNamazCount}
              onChange={handleNamazCount}
              className="w-20 h-10 outline-0 px-3 rounded-lg bg-white border-2 border-blue-300 text-center font-semibold text-gray-700 shadow-md focus:border-blue-500 transition-colors"
              type="number"
              min="0"
            />
          </div>
        )}

        {/* Namaz Name */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-gray-800 mb-2">{name}</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto"></div>
        </div>

        {/* Count Display */}
        <div className="text-center bg-white/80 p-6 rounded-2xl shadow-inner border border-gray-200/50">
          <p className="text-lg font-semibold text-gray-600 mb-2">Remaining Qada</p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-5xl font-bold ${getCountColor()} drop-shadow-sm`}>
              {namazCount}
            </span>
            <FaPrayingHands className={`text-3xl ${namazCount === 0 ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {namazCount === 0 ? 'All prayers completed! 🎉' : 'Keep going! 💪'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
          <div
            onClick={handleQuada}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl flex justify-center items-center gap-3 font-semibold hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-blue-400/30"
          >
            <button className="text-lg">Add Qada</button>
            <div className="p-1 bg-white/20 rounded-full">
              <GrAdd className="text-white" size={18} />
            </div>
          </div>
          
          <div
            onClick={handleComplete}
            className="bg-gradient-to-br from-emerald-500 to-green-600 text-white py-4 px-6 rounded-xl flex justify-center items-center gap-3 font-semibold hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-emerald-400/30"
          >
            <button className="text-lg">Complete</button>
            <div className="p-1 bg-white/20 rounded-full">
              <IoCheckmarkDone className="text-white" size={18} />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-xs mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{namazCount === 0 ? 'Complete' : 'In Progress'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: namazCount === 0 ? '100%' : '50%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="text-center mt-8">
        <p className="text-gray-600 italic text-lg">
          "The key to Paradise is prayer, and the key to prayer is purification."
        </p>
      </div>
    </div>
  )
}

export default NamazCard