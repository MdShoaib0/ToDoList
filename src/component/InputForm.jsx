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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            Smart Task Manager
          </h1>
          <p className="text-gray-500">Organize your day efficiently</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-6 md:p-8 space-y-6">

          <h2 className="text-xl font-semibold text-gray-700">
            {isEditing ? "Update Task" : "Create New Task"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Task Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter title..."
                className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none transition"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-600">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 h-12 rounded-xl border border-gray-200 appearance-none focus:ring-2 focus:ring-pink-400 outline-none bg-white"
                >
                  <option value="" disabled>Choose category</option>
                  <option value="All">All</option>
                  <option value="Daily">Daily</option>
                  <option value="Important">Important</option>
                  <option value="Must">Must</option>
                </select>
                <MdArrowDropDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write task details..."
              className="w-full p-4 h-32 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-400 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 hover:scale-[1.02] active:scale-95 transition shadow-lg"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Categorie />
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-6">
          <Navigate name={"Namaz"} navigate={"namaz"} />
        </div>

        {/* Tasks */}
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