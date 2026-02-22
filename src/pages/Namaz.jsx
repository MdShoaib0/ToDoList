import React from "react";
import NamazCard from "../components/NamazCard";
import { FaMosque, FaPray, FaStarAndCrescent } from "react-icons/fa";

function ManageNamaz() {
return ( <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-6">


  {/* Header */}
  <div className="text-center mb-16">
    <div className="flex justify-center items-center gap-4 mb-6">
      <FaStarAndCrescent className="text-emerald-400 text-3xl" />
      <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Namaz Tracker
      </h1>
      <FaStarAndCrescent className="text-emerald-400 text-3xl" />
    </div>

    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
      Track your Qada Namaz and stay consistent in your spiritual journey.
    </p>
  </div>

  {/* Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
    <NamazCard name="Fajr" />
    <NamazCard name="Dhuhr" />
    <NamazCard name="Asr" />
    <NamazCard name="Maghrib" />
    <NamazCard name="Isha" />
  </div>

  {/* Inspiration Section */}
  <div className="max-w-4xl mx-auto text-center">
    <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-xl">

      <div className="flex justify-center items-center gap-3 mb-6">
        <FaPray className="text-emerald-400 text-2xl" />
        <h3 className="text-2xl font-semibold text-gray-100">
          Words of Wisdom
        </h3>
        <FaPray className="text-emerald-400 text-2xl" />
      </div>

      <p className="text-gray-300 text-lg italic mb-4">
        "The key to Paradise is prayer, and the key to prayer is purification."
      </p>

      <div className="w-20 h-[2px] bg-emerald-400 mx-auto rounded-full"></div>

      <p className="text-gray-500 text-sm mt-4">
        - Prophet Muhammad (PBUH)
      </p>

    </div>
  </div>

  {/* Floating Button */}
  <div className="fixed bottom-8 right-8">
    <button className="
      flex items-center gap-2 px-5 py-3 rounded-full
      bg-gradient-to-r from-emerald-500 to-teal-500
      shadow-lg shadow-emerald-500/30
      hover:scale-110 transition
    ">
      <FaMosque />
      Track
    </button>
  </div>

</div>


);
}

export default ManageNamaz;
