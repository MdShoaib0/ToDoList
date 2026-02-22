import React, { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { MdOutlineDoneAll } from "react-icons/md";
import { addToQueue } from "../utils/syncQueue";

const BASE_URL = "https://to-do-list-backend-rho.vercel.app/namaz/";

function NamazCard({ name }) {

    const [allNamazData, setAllNamazData] = useState(() => {
        const saved = localStorage.getItem("namazData");
        return saved ? JSON.parse(saved) : [];
    });

    const [currentNamaz, setCurrentNamaz] = useState(null);

    useEffect(() => {
        const found = allNamazData.find(n => n.name === name);
        setCurrentNamaz(found || { name, count: 0 });
    }, [allNamazData, name]);

    async function handleFetchCount() {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            setAllNamazData(data);
            localStorage.setItem("namazData", JSON.stringify(data));
        } catch { }
    }

    const handleCreateCount = async (name, count) => {
        const payload = { name, count, updatedAt: Date.now() };
        try {
            await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            handleFetchCount();
        } catch {
            addToQueue({
                url: BASE_URL,
                options: {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            });
            setCurrentNamaz({ name, count });
        }
    };

    useEffect(() => { handleFetchCount() }, []);

    const currentCount = currentNamaz?.count || 0;

    return (

        <div className="
  rounded-2xl p-6
  bg-slate-900/60 backdrop-blur-2xl
  border border-white/10
  shadow-xl shadow-black/40
  hover:-translate-y-2 hover:shadow-emerald-500/20
  transition-all duration-300
">

            {/* Title */}

            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">
                    {name}
                </h2>
                <div className="w-12 h-[2px] bg-emerald-400 mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Counter */}

            <div className="text-center mb-8">
                <p className="text-sm text-gray-400 mb-2">Remaining Qada</p>


                <div className="flex justify-center items-center gap-3">
                    <span className="text-5xl font-extrabold text-emerald-400">
                        {currentCount}
                    </span>

                    <MdOutlineDoneAll
                        className={`text-2xl ${currentCount === 0 ? "text-emerald-400" : "text-gray-600"}`}
                    />
                </div>

            </div>

            {/* Buttons */}

            <div className="grid grid-cols-2 gap-4">

                <button
                    onClick={() => handleCreateCount(name, currentCount + 1)}
                    className="
    flex justify-center items-center gap-2 py-3 rounded-xl
    bg-emerald-500 hover:bg-emerald-600
    text-white font-medium
    active:scale-95 transition
    shadow-md shadow-emerald-500/20
  "
                >
                    <BsPlusCircle /> Add
                </button>

                <button
                    onClick={() => handleCreateCount(name, Math.max(0, currentCount - 1))}
                    className="
    flex justify-center items-center gap-2 py-3 rounded-xl
    bg-rose-500 hover:bg-rose-600
    text-white font-medium
    active:scale-95 transition
    shadow-md shadow-rose-500/20
  "
                >
                    <HiOutlineMinusCircle /> Done
                </button>


            </div>

        </div>
    );
}
export default NamazCard;
