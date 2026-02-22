import React from "react";

function Buttons(props) {
  const { name, color, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`         px-4 h-9 rounded-xl
        backdrop-blur-xl
        bg-white/10 border border-white/20
        text-white text-xs font-semibold
        shadow-lg shadow-black/25
        hover:bg-white/20 hover:shadow-xl
        active:scale-95
        transition-all duration-200
        flex items-center justify-center
        ${color}
      `}
    >
      {name} </button>
  );
}

export default Buttons;
