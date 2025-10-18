import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import TaskCard from "./TaskCard";
import Navigate from "./Navigate";
import Categorie from "./Categorie";

// const URL = "http://localhost:5000/task/";
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
      
      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.statusText}`);
      }
      
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

  const FilterTask = (categoryName) => {
    console.log("Filter by:", categoryName);
  };

  const toggleComplete = (index) => {
    console.log("Button is Successfully Clicked" + index);
  };

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

      if (!response.ok) {
        throw new Error(`Unable to Edit Task. Status: ${response.status}`);
      }

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
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }

      const result = await response.json();
      console.log(result)
      setTaskArray(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Unable to Delete Task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-16 py-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full md:w-xl"
      >
        <p id="mainTitle" className="text-2xl text-pink-700 font-bold">
          {isEditing ? "Edit Task" : "Create your Task here..."}
        </p>

        <input
          id="input"
          className="task-title bg-white outline-none px-4 h-14 rounded-lg shadow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task Title"
        />

        <div
          id="input"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-full rounded-lg shadow transition-all duration-200 bg-white"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="task-title w-full h-14 overflow-hidden px-4 pr-10 outline-none appearance-none cursor-pointer rounded-lg"
          >
            <option
              className="bg-black text-white font-bold rounded-lg"
              value=""
              disabled
            >
              Categories
            </option>
            <option className="bg-black text-white font-bold" value="All">
              All
            </option>
            <option className="bg-black text-white font-bold" value="Daily">
              Daily
            </option>
            <option className="bg-black text-white font-bold" value="Important">
              Important
            </option>
            <option className="bg-black text-white font-bold" value="Must">
              Must
            </option>
          </select>

          <MdArrowDropDown
            size={27}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        <textarea
          id="input"
          className="task-title bg-white outline-none p-4 h-32 rounded-xl shadow mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />

        <button
          id="input"
          className="task-title text-white font-bold h-14 bg-red-500 rounded-lg shadow-lg cursor-pointer"
          type="submit"
        >
          {!isEditing ? "Add Task" : "Update Task"}
        </button>
      </form>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-7">
        <Categorie />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Navigate name={"Namaz"} navigate={"namaz"} />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <TaskCard 
          taskArray={taskArray} 
          onComplete={toggleComplete} 
          onEdit={handleEdit} 
          onDelete={handleDeleteTask} 
        />
      </div>
    </div>
  );
}

export default InputForm;