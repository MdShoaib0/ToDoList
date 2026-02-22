import React from "react";
import Buttons from "./Buttons";

function TaskCard({ taskArray, onComplete, onEdit, onDelete }) {
    return (
        <>
            {taskArray.length > 0 ? (
                taskArray.map((task, index) => (
                    <div
                        key={task._id}
                        className={`               group relative
              backdrop-blur-2xl bg-white/5
              border border-white/10
              rounded-2xl p-6
              shadow-xl shadow-black/30
              hover:shadow-2xl hover:shadow-black/40
              hover:-translate-y-2
              transition-all duration-300
              flex flex-col justify-between
            `}
                    >
                        {/* Top Section */} <div className="flex justify-between items-start gap-4">

                            <div className="flex flex-col gap-3">

                                {/* Index + Title */}
                                <div className="flex items-center gap-3">
                                    <div className="
                w-9 h-9 flex items-center justify-center
                rounded-full text-sm font-bold
                bg-gradient-to-br from-pink-500 to-purple-500
                text-white shadow-lg
              ">
                                        {index + 1}
                                    </div>

                                    <h2
                                        className={`text-lg font-semibold text-white ${task.completed ? "line-through opacity-50" : ""
                                            }`}
                                    >
                                        {task.title}
                                    </h2>
                                </div>

                                {/* Category Badge */}
                                <span className="
              w-fit px-3 py-1 text-xs font-medium
              rounded-full
              bg-white/10 border border-white/20
              text-gray-300
            ">
                                    {task.category}
                                </span>

                                {/* Date */}
                                <p className="text-xs text-gray-400">
                                    {task.date}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2">
                                <Buttons
                                    onClick={() => onComplete(task._id)}
                                    name={!task.completed ? "Complete" : "Undo"}
                                />
                                <Buttons
                                    name="Edit"
                                    onClick={() => onEdit(task)}
                                />
                                <Buttons
                                    name="Delete"
                                    onClick={() => onDelete(task._id)}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                            {task.description}
                        </p>

                        {/* Glow Effect Border */}
                        <div className="
          absolute inset-0 rounded-2xl
          opacity-0 group-hover:opacity-100
          bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20
          blur-xl transition duration-500
          -z-10
        "></div>

                    </div>
                ))
            ) : (
                <div className="
      col-span-full text-center
      backdrop-blur-xl bg-white/5
      border border-white/10
      rounded-2xl p-10
      text-gray-400
    ">
                    No tasks available
                </div>
            )}
        </>

    );
}

export default TaskCard;
