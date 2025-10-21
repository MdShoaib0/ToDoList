import React from 'react'
import NamazCard from '../component/NamazCard'
import { FaMosque } from "react-icons/fa"

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-6">
        <NamazCard id={1} name="Fajr" gradient="from-teal-200 to-emerald-300" />
        <NamazCard id={2} name="Dhuhr" gradient="from-blue-200 to-cyan-300" />
        <NamazCard id={3} name="Asr" gradient="from-amber-200 to-orange-300" />
        <NamazCard id={4} name="Maghrib" gradient="from-pink-200 to-rose-300" />
        <NamazCard id={5} name="Isha" gradient="from-purple-200 to-indigo-300" />
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