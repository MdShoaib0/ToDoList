import React from 'react'
import NamazCard from '../component/NamazCard'
import { FaMosque, FaPray, FaStarAndCrescent } from "react-icons/fa"

function ManageNamaz() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        {/* Decorative Elements */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <FaStarAndCrescent className="text-white text-xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent tracking-tight">
            Namaz Tracker
          </h1>
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <FaStarAndCrescent className="text-white text-xl" />
          </div>
        </div>
        
        {/* Subtitle */}
        <div className="relative inline-block">
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium bg-white/70 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm border border-emerald-100">
            <span className="text-2xl text-emerald-600 mr-2">"</span>
            Track your Qada Namaz and stay steadfast in your journey toward Allah
            <span className="text-2xl text-emerald-600 ml-2">"</span>
          </p>
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-400 rounded-full opacity-60"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-teal-300 rounded-full opacity-60"></div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-700">5</div>
            <div className="text-sm text-gray-600">Daily Prayers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-teal-700">1440</div>
            <div className="text-sm text-gray-600">Minutes in Day</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="text-2xl font-bold text-cyan-700">17</div>
            <div className="text-sm text-gray-600">Rakats Total</div>
          </div>
        </div>
      </div>

      {/* Prayer Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          <NamazCard 
            id={1} 
            name="Fajr" 
            gradient="from-sky-100 via-cyan-100 to-blue-100"
            borderColor="border-sky-300"
            shadowColor="shadow-sky-200"
            time="Dawn"
            rakats="2"
          />
          <NamazCard 
            id={2} 
            name="Dhuhr" 
            gradient="from-emerald-100 via-green-100 to-teal-100"
            borderColor="border-emerald-300"
            shadowColor="shadow-emerald-200"
            time="Noon"
            rakats="4"
          />
          <NamazCard 
            id={3} 
            name="Asr" 
            gradient="from-amber-100 via-orange-100 to-yellow-100"
            borderColor="border-amber-300"
            shadowColor="shadow-amber-200"
            time="Afternoon"
            rakats="4"
          />
          <NamazCard 
            id={4} 
            name="Maghrib" 
            gradient="from-rose-100 via-pink-100 to-red-100"
            borderColor="border-rose-300"
            shadowColor="shadow-rose-200"
            time="Sunset"
            rakats="3"
          />
          <NamazCard 
            id={5} 
            name="Isha" 
            gradient="from-violet-100 via-purple-100 to-indigo-100"
            borderColor="border-violet-300"
            shadowColor="shadow-violet-200"
            time="Night"
            rakats="4"
          />
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-10 text-6xl">🕌</div>
            <div className="absolute bottom-4 right-10 text-6xl">📿</div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-3 mb-4">
              <FaPray className="text-3xl text-white/80" />
              <h3 className="text-2xl font-semibold text-white">
                Words of Wisdom
              </h3>
              <FaPray className="text-3xl text-white/80" />
            </div>
            <p className="text-white/90 text-lg italic leading-relaxed mb-4">
              "The key to Paradise is prayer, and the key to prayer is purification."
            </p>
            <div className="w-24 h-1 bg-white/30 rounded-full mx-auto"></div>
            <p className="text-white/70 text-sm mt-4 font-medium">
              - Prophet Muhammad (PBUH)
            </p>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-emerald-100">
          <h3 className="text-xl font-semibold text-emerald-800 mb-4">
            Today's Spiritual Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl font-bold text-emerald-600">5/5</div>
              <div className="text-sm text-gray-600">Prayers</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-teal-600">17/17</div>
              <div className="text-sm text-gray-600">Rakats</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-cyan-600">100%</div>
              <div className="text-sm text-gray-600">Consistency</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-violet-600">∞</div>
              <div className="text-sm text-gray-600">Blessings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group">
          <FaMosque className="text-xl" />
          <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap">
            Track Progress
          </span>
        </button>
      </div>
    </div>
  )
}

export default ManageNamaz