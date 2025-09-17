import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Navigation from "./Navigation";
import { MdArrowDropDown } from "react-icons/md";
import { motion } from "framer-motion";

function InputField() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [complete, setComplete] = useState(false);

  const Categories = [
    { name: "All", color: "bg-emerald-600" },
    { name: "Normal", color: "bg-orange-600" },
    { name: "Must", color: "bg-pink-600" },
    { name: "Daily", color: "bg-purple-600" },
  ];

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

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setAllTasks(storedTasks);
    setTaskArray(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  // Handle create or edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !description.trim()) return;

    if (isEditing && editId !== null) {
      const updatedTasks = allTasks.map((task) =>
        task.id === editId ? { ...task, title, category, description } : task
      );
      setAllTasks(updatedTasks);
      setTaskArray(updatedTasks);
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTask = { id: Date.now(), title, category, description };
      const updated = [...allTasks, newTask];
      setAllTasks(updated);
      setTaskArray(updated);
    }

    setTitle("");
    setCategory("");
    setDescription("");
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    const filtered = allTasks.filter((task) => task.id !== id);
    setAllTasks(filtered);
    setTaskArray(filtered);
  };

  // Filter tasks by category
  const FilterTask = (categoryName) => {
    if (categoryName === "All") {
      setTaskArray(allTasks);
    } else {
      const filtered = allTasks.filter((task) => task.category === categoryName);
      setTaskArray(filtered);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-12">
      {/* Task Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full md:w-xl">
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-xl text-pink-700 font-semibold"
        >
          {isEditing ? "Edit Task" : "Create your Task here..."}
        </motion.p>

        {/* Title Input */}
        <motion.input
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task Title"
          className="bg-white outline-none px-4 h-14 rounded-lg shadow"
        />

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full bg-white rounded-lg shadow"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-14 px-4 pr-10 outline-none appearance-none bg-transparent"
          >
            <option value="" disabled>
              Categories
            </option>
            {Categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <MdArrowDropDown
            size={27}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </motion.div>

        {/* Description Textarea */}
        <motion.textarea
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="bg-white outline-none p-4 h-32 rounded-xl shadow mb-4"
        />

        {/* Add/Update Button */}
        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.97 }}
          className="text-white font-bold h-14 bg-red-600 rounded-lg shadow-lg cursor-pointer"
        >
          {!isEditing ? "Add Task" : "Update Task"}
        </motion.button>
      </form>

      {/* Filter Buttons */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-7">
        {Categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5}}
            whileTap={{ scale: 0.95 }}
            className={`text-white font-bold h-14 ${cat.color} rounded-lg shadow-lg cursor-pointer`}
            onClick={() => FilterTask(cat.name)}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Task List */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {taskArray.length > 0 ? (
          taskArray.map((task, index) => (
            <div
              key={task.id}
              className={`${complete
                  ? `bg-gradient-to-r ${TaskColor1[index % TaskColor1.length].start} ${TaskColor1[index % TaskColor1.length].end}`
                  : `bg-gradient-to-r ${TaskColor[index % TaskColor.length].start} ${TaskColor[index % TaskColor.length].end}`
                } flex flex-col gap-2 rounded-xl shadow-2xl shadow-slate-400 p-6`}
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <p className="w-9 h-9 cursor-pointer active:scale-95 transition-all duration-200 flex justify-center items-center text-2xl font-bold rounded-full shadow shadow-black bg-gradient-to-br from-blue-300 to-blue-600 text-white">
                      {index + 1}
                    </p>
                    <p
                      className={`${complete
                          ? "line-through text-2xl font-bold text-slate-900"
                          : "text-2xl font-bold text-slate-900"
                        }`}
                    >
                      {task.title}
                    </p>
                  </div>
                  <p className="w-fit text-sm font-bold bg-gradient-to-br from-pink-400 to-pink-600 px-3.5 py-1 rounded-full text-white shadow shadow-gray-600">
                    {task.category}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Buttons
                    onClick={() => setComplete((prev) => !prev)}
                    name={!complete ? "Complete" : "Undo"}
                    color="bg-gradient-to-br from-green-400 to-green-600"
                  />
                  <Buttons
                    name="Edit"
                    color="bg-gradient-to-br from-yellow-400 to-yellow-600"
                    onClick={() => {
                      setIsEditing(true);
                      setEditId(task.id);
                      setTitle(task.title);
                      setCategory(task.category);
                      setDescription(task.description);
                    }}
                  />
                  <Buttons
                    name="Delete"
                    color="bg-gradient-to-br from-red-400 to-red-600"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
              <p className="text-slate-700">{task.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default InputField;