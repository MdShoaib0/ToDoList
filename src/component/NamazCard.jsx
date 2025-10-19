import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { MdOutlineModeEdit, MdOutlineDoneAll } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

function NamazCard({ keys, names, gradient }) {
  const [namazCount, setNamazCount] = useState(0);
  const [edit, setEdit] = useState(false);
  const [newNamazCount, setNewNamazCount] = useState(0);

  const handleQuada = () => setNamazCount((prev) => prev + 1);
  const handleComplete = () =>
    setNamazCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleEdit = () => {
    if (edit) {
      setNamazCount(Number(newNamazCount));
      setEdit(false);
    } else {
      setNewNamazCount(namazCount);
      setEdit(true);
    }
  };

  const handleNamazCount = (e) => setNewNamazCount(e.target.value);

  const getCountColor = () => {
    if (namazCount === 0) return "text-emerald-600";
    if (namazCount <= 5) return "text-amber-500";
    return "text-rose-600";
  };

  return (
    <div
      key={keys}
      className={`relative w-full max-w-md rounded-3xl p-8 bg-gradient-to-br from-white/60 via-emerald-50/80 to-green-100/60 border-2 border-emerald-300/50 shadow-2xl shadow-teal-200 hover:scale-105 transition-all duration-500 cursor-pointer`}
    >
      {/* Edit / Save Button */}
      <div
        onClick={handleEdit}
        className="absolute top-6 right-6 cursor-pointer group"
      >
        {!edit ? (
          <div className="flex items-center gap-2 bg-emerald-100/80 px-3 py-2 rounded-xl shadow-md hover:bg-emerald-200 transition-all duration-300 border border-emerald-300/60">
            <MdOutlineModeEdit className="text-emerald-700 text-lg" />
            <p className="text-sm font-semibold text-emerald-800">Edit</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-emerald-600 px-3 py-2 rounded-xl shadow-md hover:bg-emerald-700 transition-all duration-300">
            <FaRegSave className="text-white text-lg" />
            <p className="text-sm font-semibold text-white">Save</p>
          </div>
        )}
      </div>

      {/* Input Field */}
      {edit && (
        <div className="absolute top-20 right-6">
          <input
            type="number"
            min="0"
            value={newNamazCount}
            onChange={handleNamazCount}
            className="w-24 h-10 px-3 text-center text-gray-700 font-semibold rounded-lg bg-white/80 border-2 border-emerald-300 focus:border-emerald-500 outline-none shadow-sm transition-all"
          />
        </div>
      )}

      {/* Namaz Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-emerald-900">{names}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Namaz Count Display */}
      <div className="bg-white/70 p-6 rounded-2xl shadow-inner border border-gray-200 text-center mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Remaining Qada
        </p>
        <div className="flex items-center justify-center gap-3">
          <span
            className={`text-5xl font-extrabold ${getCountColor()} transition-all`}
          >
            {namazCount}
          </span>
          <MdOutlineDoneAll
            className={`text-3xl ${namazCount === 0 ? "text-emerald-500" : "text-gray-400"
              }`}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {namazCount === 0
            ? "All prayers completed! 🌙"
            : "Keep going, Allah loves consistency 💫"}
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-6">
        <div
          onClick={handleQuada}
          className="bg-gradient-to-br from-emerald-500 to-green-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-semibold hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <BsPlusCircle className="text-white text-lg" />
          <button>Add Qada</button>
        </div>
        <div
          onClick={handleComplete}
          className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-semibold hover:from-rose-600 hover:to-rose-700 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <HiOutlineMinusCircle className="text-white text-lg" />
          <button>Complete</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{namazCount === 0 ? "Complete" : "In Progress"}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{
              width:
                namazCount === 0
                  ? "100%"
                  : `${Math.max(10, 100 - namazCount * 5)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default NamazCard;