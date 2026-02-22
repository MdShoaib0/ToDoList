import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import TaskCard from "./TaskCard";
import Navigate from "./Navigate";
import Categorie from "./Categorie";

const URL = "https://to-do-list-backend-rho.vercel.app/task/";

function InputForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [taskArray, setTaskArray] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const tasksArray = Array.isArray(data) ? data : [data];
      setTaskArray(tasksArray);
    } catch (error) {
      console.error("Unable to Fetch Task data:", error.message);
    }
  };

  const AddTask = async (newTask) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error(`Failed to add task: ${response.statusText}`);
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: title,
      category: category,
      date: new Date().toLocaleString(),
      description: description,
      completed: false,
    };

    isEditing ? handleEditTask(newTask) && setIsEditing((prev) => !prev) : AddTask(newTask);

    setTitle("");
    setCategory("");
    setDescription("");
  };

  const FilterTask = (categoryName) => console.log("Filter by:", categoryName);
  const toggleComplete = (index) => console.log("Button is Successfully Clicked" + index);

  const handleEdit = (editTask) => {
    setTitle(editTask.title);
    setCategory(editTask.category);
    setDescription(editTask.description);
    setIsEditing((prev) => !prev);
    setEditId(editTask._id);
  };

  const handleEditTask = async (editableTask) => {
    try {
      const response = await fetch(`${URL}${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editableTask),
      });
      if (!response.ok) throw new Error(`Unable to Edit Task. Status: ${response.status}`);
      const updatedTask = await response.json();
      fetchTasks();
      return updatedTask;
    } catch (error) {
      console.error("Error editing task:", error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    const deleteUrl = `${URL}${taskId}`;
    try {
      const response = await fetch(deleteUrl, { method: "DELETE", headers: { "Content-Type": "application/json" } });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
      setTaskArray(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Unable to Delete Task:", error);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* Top Header */}
        <div className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">TaskFlow</h1>
            <p className="text-sm text-gray-300">Your productivity companion</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Total Tasks</p>
            <p className="text-2xl font-bold">{taskArray.length}</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-6 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

          <div className="space-y-4 lg:col-span-1">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Task title..."
              className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 focus:border-pink-400 outline-none"
            />

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/10 border border-white/20 appearance-none outline-none"
              >
                <option value="" disabled>Choose category</option>
                <option value="All">All</option>
                <option value="Daily">Daily</option>
                <option value="Important">Important</option>
                <option value="Must">Must</option>
              </select>
              <MdArrowDropDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
            </div>

            <button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:scale-105 active:scale-95 transition">
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>

          <div className="lg:col-span-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write detailed description..."
              className="w-full h-full min-h-[120px] p-4 rounded-xl bg-white/10 border border-white/20 outline-none resize-none"
            />
          </div>
        </form>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Categorie />
        </div>

        {/* Navigate */}
        <div className="grid grid-cols-2 gap-6">
          <Navigate name={"Namaz"} navigate={"namaz"} />
        </div>

        {/* Task List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TaskCard
            taskArray={taskArray}
            onComplete={toggleComplete}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
          />
        </div>

      </div>
    </div>
  );
}

export default InputForm;