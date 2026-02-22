import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineDoneAll } from "react-icons/md";

const BASE_URL = "https://to-do-list-backend-rho.vercel.app/namaz/";

function NamazCard({ id, name }) {
  const [allNamazData, setAllNamazData] = useState([]);
  const [currentNamaz, setCurrentNamaz] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    if (allNamazData.length > 0) {
      const foundNamaz = allNamazData.find(namaz => namaz.name === name);
      setCurrentNamaz(foundNamaz || { name, count: 0 });
      setInputCount(foundNamaz?.count || 0);
    }
  }, [allNamazData, name]);

  async function handleFetchCount() {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const newData = await response.json();
        setAllNamazData(newData);
      }
    } catch (error) {
      console.error("Problem in Fetching:", error);
    }
  }

  const handleCreateCount = async (name, count) => {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, count })
      });
      await handleFetchCount();
    } catch (error) {
      console.error("Error creating count:", error);
    }
  };

  useEffect(() => { handleFetchCount(); }, []);

  const currentCount = currentNamaz?.count || 0;

  return (<div className="
   relative w-full max-w-md rounded-3xl p-8
   backdrop-blur-2xl bg-white/5
   border border-emerald-400/20
   shadow-2xl shadow-black/40
   hover:-translate-y-2 hover:shadow-emerald-500/20
   transition-all duration-300
   text-white
 ">

    {/* Edit Toggle */}
    <div
      onClick={() => setEditMode(!editMode)}
      className="absolute top-6 right-6 cursor-pointer"
    >
      {!editMode ? (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20">
          <MdOutlineModeEdit /> <span>Edit</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/80">
          <FaRegSave /> <span>Save</span>
        </div>
      )}
    </div>

    {/* Title */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold tracking-wide">{name}</h2>
      <div className="w-24 h-[2px] bg-emerald-400 mx-auto mt-2"></div>
    </div>

    {/* Counter */}
    <div className="text-center mb-8">
      <p className="text-sm text-gray-300 mb-2">Remaining Qada</p>
      <div className="flex justify-center items-center gap-3">
        <span className="text-6xl font-extrabold text-emerald-300">
          {currentCount}
        </span>
        <MdOutlineDoneAll className={currentCount === 0 ? "text-emerald-400 text-3xl" : "text-gray-500 text-3xl"} />
      </div>
    </div>

    {/* Controls */}
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => handleCreateCount(name, currentCount + 1)}
        className="flex justify-center items-center gap-2 py-3 rounded-xl bg-emerald-500/80 hover:bg-emerald-500"
      >
        <BsPlusCircle /> Add
      </button>

      <button
        onClick={() => handleCreateCount(name, Math.max(0, currentCount - 1))}
        className="flex justify-center items-center gap-2 py-3 rounded-xl bg-rose-500/80 hover:bg-rose-500"
      >
        <HiOutlineMinusCircle /> Done
      </button>
    </div>

    {/* Progress */}
    <div className="mt-6">
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 transition-all duration-500"
          style={{ width: currentCount === 0 ? "100%" : `${Math.max(10, 100 - currentCount * 10)}%` }}
        ></div>
      </div>
    </div>

    {/* Glow */}
    <div className="absolute inset-0 rounded-3xl bg-emerald-500/10 blur-2xl opacity-0 hover:opacity-100 transition duration-500 -z-10"></div>

  </div>

  );
}

export default NamazCard;
