import React, { Fragment } from "react";
import { Link } from "react-router";

const category = [
    { name: "Namaz", glow: "from-cyan-400/40 to-blue-500/40 border-cyan-400/30" },
    { name: "Tasbih", glow: "from-teal-400/40 to-emerald-500/40 border-teal-400/30" }
];

function Navigate() {
    return (<Fragment>
        {category.map((cat, index) => (
            <Link
                key={index}
                to={`/${cat.name}`}
                className={`             group relative text-center
            backdrop-blur-2xl bg-white/5
            border ${cat.glow}
            rounded-2xl py-3
            font-semibold text-white tracking-wide
            shadow-xl shadow-black/25
            hover:-translate-y-2 hover:shadow-2xl
            transition-all duration-300
            overflow-hidden
          `}
            >
                {/* Text */} <span className="relative z-10">{cat.name}</span>

                {/* Hover Glow */}
                <div className={`
        absolute inset-0 opacity-100 group-hover:opacity-10
        bg-gradient-to-r ${cat.glow}
        blur-xl transition duration-500
      `}></div>
            </Link>
        ))}
    </Fragment>

    );
}

export default Navigate;