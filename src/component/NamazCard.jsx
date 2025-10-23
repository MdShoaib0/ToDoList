import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineDoneAll } from "react-icons/md";

// const BASE_URL = "http://localhost:5000/namaz/";
const BASE_URL = "https://to-do-list-backend-rho.vercel.app/task/";

function NamazCard({ id, name, gradient }) {
  const [allNamazData, setAllNamazData] = useState([]); // Store all data from API
  const [currentNamaz, setCurrentNamaz] = useState(null); // Store current namaz data
  const [editMode, setEditMode] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Find current namaz data from allNamazData
  useEffect(() => {
    if (allNamazData.length > 0) {
      const foundNamaz = allNamazData.find(namaz => namaz.name === name);
      setCurrentNamaz(foundNamaz || { name, count: 0 });
      setInputCount(foundNamaz?.count || 0);
    }
  }, [allNamazData, name]);

  function handleInputToggle() {
    if (editMode) {
      handleUpdateCount();
    }
    setEditMode((prev) => !prev);
  }

  function handleInputChange(event) {
    const newCount = Math.max(0, Number(event.target.value));
    setInputCount(newCount);
  }

  async function handleUpdateCount() {
    await handleCreateCount(name, inputCount);
  }

  async function handleIncrementCount() {
    const newCount = (currentNamaz?.count || 0) + 1;
    await handleCreateCount(name, newCount);
  }

  async function handleDecrementCount() {
    const newCount = Math.max(0, (currentNamaz?.count || 0) - 1);
    await handleCreateCount(name, newCount);
  }

  async function handleFetchCount() {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL);

      if (response.ok) {
        const newData = await response.json();
        setAllNamazData(newData);
      } else {
        console.error("Unable to Load Data");
      }
    } catch (error) {
      console.error("Problem in Fetching:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCount = async (name, count) => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, count })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      // Refresh data after update
      await handleFetchCount();
    } catch (error) {
      console.error("Error creating count:", error);
    }
  };

  // Initialize data
  useEffect(() => {
    handleFetchCount();
  }, []);

  // Calculate progress based on current count
  const currentCount = currentNamaz?.count || 0;
  const progressWidth = currentCount === 0 ? "100%" : `${Math.max(10, 100 - currentCount * 10)}%`;

  if (loading && !currentNamaz) {
    return (
      <div className={`relative w-full max-w-md rounded-3xl p-8 bg-gradient-to-br ${gradient} border-2 border-emerald-300/50 animate-pulse`}>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div
      key={id}
      className={`relative w-full max-w-md rounded-3xl p-8 bg-gradient-to-br ${gradient} border-2 border-emerald-300/50 shadow-2xl shadow-teal-200 hover:scale-105 transition-all duration-500`}
    >
      {/* 🔧 Edit / Save Button */}
      <div
        onClick={handleInputToggle}
        className="absolute top-6 right-6 cursor-pointer"
      >
        {!editMode ? (
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

      {/* 🔢 Input Field (Edit Mode) */}
      {editMode && (
        <div className="absolute top-20 right-6">
          <input
            type="number"
            min="0"
            value={inputCount}
            onChange={handleInputChange}
            className="w-24 h-10 px-3 text-center text-gray-700 font-semibold rounded-lg bg-white/80 border-2 border-emerald-300 focus:border-emerald-500 outline-none shadow-sm transition-all"
          />
        </div>
      )}

      {/* 🕌 Namaz Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-emerald-900">{name}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* 🔢 Namaz Count Display */}
      <div className="bg-white/70 p-6 rounded-2xl shadow-inner border border-gray-200 text-center mb-6">
        <p className="text-lg font-semibold text-gray-700 mb-2">Remaining Qada</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-extrabold text-rose-700 transition-all">
            {currentCount}
          </span>
          <MdOutlineDoneAll
            className={`text-3xl ${currentCount === 0 ? "text-emerald-500" : "text-gray-400"}`}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {currentCount === 0
            ? "All prayers completed! 🌙"
            : "Keep going, Allah loves consistency 💫"}
        </p>
      </div>

      {/* ➕ / ➖ Buttons */}
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={handleIncrementCount}
          className="bg-gradient-to-br from-emerald-400 to-green-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-semibold hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          <BsPlusCircle className="text-white text-lg" />
          Add Qada
        </button>
        <button
          onClick={handleDecrementCount}
          disabled={currentCount === 0}
          className="bg-gradient-to-br from-rose-400 to-rose-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-semibold hover:from-rose-600 hover:to-rose-700 active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiOutlineMinusCircle className="text-white text-lg" />
          Complete
        </button>
      </div>

      {/* 📊 Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentCount === 0 ? "Complete" : "In Progress"}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default NamazCard;