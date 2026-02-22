import React from "react";
import { motion } from "motion/react";

const Categories = [
{ name: "All", color: "from-emerald-400/40 to-emerald-600/40 border-emerald-400/40" },
{ name: "Daily", color: "from-orange-400/40 to-orange-600/40 border-orange-400/40" },
{ name: "Important", color: "from-pink-400/40 to-pink-600/40 border-pink-400/40" },
{ name: "Must", color: "from-purple-400/40 to-purple-600/40 border-purple-400/40" },
];

function Categorie() {
return (
<>
{Categories.map((cat) => (
<motion.button
key={cat.name}
whileTap={{ scale: 0.92 }}
whileHover={{ scale: 1.07 }}
transition={{ type: "spring", stiffness: 300, damping: 15 }}
className={`             h-12 px-4 rounded-xl
            backdrop-blur-xl bg-gradient-to-br ${cat.color}
            border text-white font-semibold
            shadow-lg shadow-black/20
            hover:shadow-xl hover:shadow-black/30
            transition-all duration-300
            flex items-center justify-center gap-2
          `}
> <span className="w-2 h-2 rounded-full bg-white/80"></span>
{cat.name}
</motion.button>
))}
</>
);
}

export default Categorie;