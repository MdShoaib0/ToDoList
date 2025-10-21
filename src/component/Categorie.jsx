import React from 'react'
import { motion } from "motion/react";

 const Categories = [
    { name: "All", color: "bg-emerald-500" },
    { name: "Daily", color: "bg-orange-500" },
    { name: "Important", color: "bg-pink-500" },
    { name: "Must", color: "bg-purple-500" },
  ];

function Categorie() {
    return (
        <>
            {Categories.map((cat) => (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    key={cat.name}
                    id={cat.name}
                    className={`text-white font-bold h-14 ${cat.color} rounded-lg shadow cursor-pointer`}
                >
                    {cat.name}
                </motion.button>
            ))}
        </>
    )
}

export default Categorie;