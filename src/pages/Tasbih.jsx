import React, { useState } from "react";

export default function Tasbih() {
  const [count, setCount] = useState(0);

  return (<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white flex flex-col items-center justify-center gap-6">

    <h1 className="text-4xl font-bold">Tasbih Counter</h1>

    <div className="text-7xl font-extrabold text-emerald-400">
      {count}
    </div>

    <div className="flex gap-4">
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-emerald-500 rounded-xl"
      >
        Add
      </button>

      <button
        onClick={() => setCount(0)}
        className="px-6 py-3 bg-rose-500 rounded-xl"
      >
        Reset
      </button>
    </div>

  </div>

  );
}
