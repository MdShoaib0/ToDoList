import React from 'react';

function Buttons(props) {
  const { name, color, onClick } = props;

  return (
    <div>
      <button
        onClick={onClick}
        className={`w-21 h-8 rounded-lg outline-none border-none shadow text-slate-100 text-sm font-bold cursor-pointer 
          ${color} 
          active:scale-97 
          transition-all duration-300`}
      >
        {name}
      </button>
    </div>
  );
}

export default Buttons;
