import React, { useState, useEffect } from 'react';
import CategoryProps from '../Categories/CategoryProps';
import Buttons from '../CreateTask/Buttons';
import Navigation from '../Navigation/Navigation';
import { MdArrowDropDown } from "react-icons/md";

function InputField() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const Categories = [
    { name: "All", color: "bg-emerald-600"},
    { name: "Normal", color: "bg-orange-600"},
    { name: "Must", color: "bg-pink-600"},
    { name: "Daily", color: "bg-purple-600"}
  ];

  const TaskColor = [
    { start: "from-emerald-100", end: "to-emerald-300" },
    { start: "from-pink-200", end: "to-pink-400" },
    { start: "from-sky-200", end: "to-sky-400" },
    { start: "from-orange-300", end: "to-orange-600" },
  ];

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setAllTasks(storedTasks);
    setTaskArray(storedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
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
      const newTask = {
        id: Date.now(),
        title,
        category,
        description,
      };
      const updated = [...allTasks, newTask];
      setAllTasks(updated);
      setTaskArray(updated);
    }

    setTitle("");
    setCategory("");
    setDescription("");
  };

  // Delete task
  const handleDeleteTask = (id) => {
    const filtered = allTasks.filter(task => task.id !== id);
    setAllTasks(filtered);
    setTaskArray(filtered);
  };

  // Filter tasks
  const FilterTask = (categoryName) => {
    if (categoryName === "All") {
      setTaskArray(allTasks);
    } else {
      const filtered = allTasks.filter(task => task.category === categoryName);
      setTaskArray(filtered);
    }
  };

  return (
    <div className='flex flex-col gap-16 py-12'>
      {/* Form */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full md:w-xl'>
        <p className='text-xl text-pink-700 font-semibold'>
          {isEditing ? "Edit Task" : "Create your Task here..."}
        </p>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Task Title'
          className='bg-white outline-none px-4 border-none h-14 rounded-lg shadow'
        />

        <div className='relative w-full bg-white rounded-lg shadow'>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full h-14 px-4 pr-10 outline-none appearance-none bg-transparent'
          >
            <option value="" disabled>Categories</option>
            <option value="All">ALL</option>
            <option value="Normal">Normal</option>
            <option value="Must">Must</option>
            <option value="Daily">Daily</option>
          </select>
          <MdArrowDropDown size={27} className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Task Description'
          className='bg-white outline-none p-4 h-32 rounded-xl shadow mb-4'
        ></textarea>

        <CategoryProps name={!isEditing ? "Add Task" : "Update Task"} color="bg-red-600"/>
      </form>

      {/* Filters */}
      <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-7'>
        {Categories.map((cat) => (
          <CategoryProps
            key={cat.name}
            name={cat.name}
            color={cat.color}
            onClick={() => FilterTask(cat.name)}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Task List */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12'>
        {taskArray.length > 0 ? taskArray.map((task, index) => (
          <div
            key={task.id}
            className={`flex flex-col gap-2 bg-gradient-to-b ${TaskColor[index % TaskColor.length].start} ${TaskColor[index % TaskColor.length].end} rounded-2xl shadow-2xl shadow-slate-400 p-6`}
          >
            <div className='flex justify-between'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <p className='w-9 h-9 cursor-pointer active:scale-97 transition-all duration-200 flex justify-center items-center text-2xl font-bold rounded-full shadow shadow-black bg-gradient-to-br from-blue-300 to-blue-600 text-white'>
                    {index + 1}
                  </p>
                  <p className='text-2xl font-bold text-slate-900'>{task.title}</p>
                </div>
                <p className='w-fit text-sm font-bold bg-gradient-to-br from-pink-400 to-pink-600 px-3.5 py-1 rounded-full text-white border-none outline-none shadow shadow-black cursor-pointer active:scale-95 transition-all duration-200'>
                  {task.category}
                </p>
              </div>

              <div className='flex flex-col gap-1.5'>
                <Buttons name="Complete" color="bg-gradient-to-br from-green-400 to-green-600"/>
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

            <p className='text-slate-700'>{task.description}</p>
          </div>
        )) : (
          <p className='text-center text-gray-700 col-span-full'>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default InputField;