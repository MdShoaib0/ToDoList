import React from 'react'
import Buttons from './Buttons';

 const TaskColor = [
    { start: "from-emerald-200", end: "to-emerald-400" },
    { start: "from-pink-200", end: "to-pink-400" },
    { start: "from-sky-200", end: "to-sky-400" },
    { start: "from-orange-200", end: "to-orange-400" },
  ];

  const TaskColor1 = [
    { start: "from-emerald-100", end: "to-emerald-200" },
    { start: "from-pink-100", end: "to-pink-200" },
    { start: "from-sky-100", end: "to-sky-200" },
    { start: "from-orange-100", end: "to-orange-200" },
  ];

function TaskCard({ taskArray, onComplete, onEdit, onDelete }) {
    return (
        <>
            {taskArray.length > 0 ? (
                taskArray.map((task, index) => (
                    <div
                        key={task._id}
                        className={`bg-gradient-to-r ${task.completed
                            ? `${TaskColor1[index % TaskColor1.length].start} ${TaskColor1[index % TaskColor1.length].end}`
                            : `${TaskColor[index % TaskColor.length].start} ${TaskColor[index % TaskColor.length].end}`
                            } flex flex-col gap-2 rounded-xl shadow-lg p-6`}
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <p className="w-9 h-9 cursor-pointer active:scale-95 transition-all duration-200 flex justify-center items-center text-2xl font-bold rounded-full shadow bg-gradient-to-br from-blue-300 to-blue-600 text-white">
                                        {index + 1}
                                    </p>
                                    <p
                                        className={`text-2xl font-bold text-emerald-950 ${task.completed ? "line-through" : ""
                                            }`}
                                    >
                                        {task.title}
                                    </p>
                                </div>
                                <p className="w-fit text-sm font-bold bg-gradient-to-br from-pink-400 to-pink-600 px-3.5 py-1 rounded-full text-white shadow">
                                    {task.category}
                                </p>
                                <p className="text-sm font-medium text-gray-600">{task.date}</p>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {/* Change this line */}
                                <Buttons
                                    onClick={()=>onComplete(task._id)}
                                    name={!task.completed ? "Complete" : "Undo"}
                                    color="bg-gradient-to-br from-green-400 to-green-600"
                                />
                                <Buttons
                                    name="Edit"
                                    color="bg-gradient-to-br from-yellow-400 to-yellow-600"
                                    onClick={() => onEdit(task)}
                                />
                                <Buttons
                                    name="Delete"
                                    color="bg-gradient-to-br from-red-400 to-red-600"
                                    onClick={()=>onDelete(task._id)}
                                />
                            </div>
                        </div>
                        <p className="text-slate-700 font-medium whitespace-pre-line">
                            {task.description}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700 col-span-full">
                    No tasks available
                </p>
            )}
        </>
    )
}

export default TaskCard;