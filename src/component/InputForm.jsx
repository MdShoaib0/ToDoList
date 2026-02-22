import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import TaskCard from "./TaskCard";
import Navigate from "./Navigate";
import Categorie from "./Categorie";
import { addToQueue, processQueue } from "../utils/syncQueue";

const URL = "https://to-do-list-backend-rho.vercel.app/task/";

function InputForm() {

// cached tasks
const [taskArray, setTaskArray] = useState(() => {
const saved = localStorage.getItem("tasks");
return saved ? JSON.parse(saved) : [];
});

const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);
const [isOpen, setIsOpen] = useState(false);

// fetch tasks
const fetchTasks = async () => {
try {
const response = await fetch(URL);
const data = await response.json();
const tasksArray = Array.isArray(data) ? data : [data];


  setTaskArray(tasksArray);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
} catch {
  console.log("offline → cached tasks");
}


};

// add task
const AddTask = async (newTask) => {
const payload = { ...newTask, updatedAt: Date.now() };


try {
  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  fetchTasks();

} catch {
  addToQueue({
    url: URL,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  });

  setTaskArray(prev => {
    const updated = [...prev, payload];
    localStorage.setItem("tasks", JSON.stringify(updated));
    return updated;
  });
}


};

const handleSubmit = (e) => {
e.preventDefault();
const newTask = { title, category, date: new Date().toLocaleString(), description, completed: false };

isEditing ? handleEditTask(newTask) : AddTask(newTask);

setTitle("");
setCategory("");
setDescription("");
setIsEditing(false);


};

const handleEdit = (task) => {
setTitle(task.title);
setCategory(task.category);
setDescription(task.description);
setEditId(task._id);
setIsEditing(true);
};

const handleEditTask = async (editableTask) => {
const payload = { ...editableTask, updatedAt: Date.now() };


try {
  await fetch(`${URL}${editId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  fetchTasks();

} catch {
  addToQueue({
    url: `${URL}${editId}`,
    options: {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  });
}

};

const handleDeleteTask = async (id) => {
try {
await fetch(`${URL}${id}`, { method: "DELETE" });


  setTaskArray(prev => {
    const updated = prev.filter(t => t._id !== id);
    localStorage.setItem("tasks", JSON.stringify(updated));
    return updated;
  });

} catch {
  addToQueue({ url: `${URL}${id}`, options: { method: "DELETE" } });
}


};

// background sync
useEffect(() => {
navigator.serviceWorker?.addEventListener("message", (event) => {
if (event.data.type === "SYNC_NOW") processQueue();
});
}, []);

useEffect(() => { fetchTasks(); }, []);

return ( <div className="min-h-screen text-white p-6"> <div className="max-w-6xl mx-auto space-y-12">


    {/* Form Card */}
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        {isEditing ? "Update Task" : "Create New Task"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task title..."
          className="w-full px-4 h-12 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 h-12 rounded-xl bg-white/10 border border-white/20 appearance-none outline-none"
          >
            <option value="">Choose category</option>
            <option value="Daily">Daily</option>
            <option value="Important">Important</option>
            <option value="Must">Must</option>
          </select>
          <MdArrowDropDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description..."
        className="w-full p-4 h-32 rounded-xl bg-white/10 border border-white/20 outline-none resize-none"
      />

      <button
        type="submit"
        className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:scale-[1.02] active:scale-95 transition"
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>

    {/* Filters */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Categorie />
    </div>

    {/* Navigation */}
    <div className="grid grid-cols-2 gap-6">
      <Navigate />
    </div>

    {/* Tasks */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <TaskCard
        taskArray={taskArray}
        onEdit={handleEdit}
        onDelete={handleDeleteTask}
        onComplete={() => {}}
      />
    </div>

  </div>
</div>


);
}

export default InputForm;
