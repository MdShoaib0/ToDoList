import React from 'react'
import NamazCard from '../component/NamazCard'
import { FaMosque } from "react-icons/fa"

const namazNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const namazGradients = [
  "from-sky-100 via-sky-200 to-emerald-100",
  "from-yellow-100 via-amber-200 to-orange-100",
  "from-amber-100 via-orange-200 to-rose-100",
  "from-rose-100 via-red-200 to-purple-200",
  "from-indigo-100 via-blue-200 to-slate-300"
];


function ManageNamaz() {
  return (
    <>
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <FaMosque className="text-4xl text-emerald-700 drop-shadow-md" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-wide">
            Namaz Tracker
          </h1>
          <FaMosque className="text-4xl text-emerald-700 drop-shadow-md" />
        </div>
        <p className="text-gray-700 text-lg max-w-xl mx-auto italic">
          “Track your Qada Namaz and stay steadfast in your journey toward
          Allah.”
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {namazNames.map((name, index) => (
          <NamazCard
            keys={name}
            names={name}
            gradient={namazGradients[index]}
          />
        ))}

      </div>
      <div className="text-center my-10">
        <p className="text-gray-700 italic text-lg font-medium">
          “The key to Paradise is prayer, and the key to prayer is purification.”
        </p>
      </div>
    </>
  )
}

export default ManageNamaz