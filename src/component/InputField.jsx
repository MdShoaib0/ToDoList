import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";
import { MdArrowDropDown } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router";
import { motion } from "motion/react";

const URL = "https://to-do-list-backend-rho.vercel.app/task";

function InputField() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [taskArray, setTaskArray] = useState([]);

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

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Check if the data is an array before accessing
      if (Array.isArray(data)) {
        data.forEach(task => console.log("Task ID:", task._id));
      } else if (data && data._id) {
        console.log("Single Task ID:", data._id);
      }

      setTaskArray(data); // update state
    } catch (error) {
      console.error("❌ Unable to Fetch Task data:", error.message);
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

      console.log("✅ Task added successfully:", newTask);
      await fetchTasks();
    } catch (error) {
      console.error("❌ Error adding task:", error);
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
    console.log("HandleSubmit is running")
    AddTask(newTask);
    setTitle("");
    setCategory("");
    setDescription("");
  };

  const FilterTask = (categoryName) => {
    console.log("Filter by:", categoryName);
  };

  const toggleComplete = (taskId) => {
    console.log("Toggle complete:", taskId);
  };

  const handleDeleteTask = (taskId) => {
    console.log("Delete task:", taskId);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from("#mainTitle", {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "sine.out",
    })
      .from(
        "#input",
        {
          y: 25,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "sine.out",
        },
        "-=85%"
      )
      .from(
        "#All, #Must",
        {
          x: -20,
          y: -10,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "sine.out",
        },
        "Category, -=85%"
      )
      .from(
        "#Normal, #Daily",
        {
          x: 20,
          y: -10,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "sine.out",
        },
        "Category, -=85%"
      )
      .from(
        "#Namaz",
        {
          x: -20,
          opacity: 0,
          duration: 0.7,
          ease: "sine.out",
        },
        "Navigation, -=85%"
      )
      .from(
        "#OurStory",
        {
          x: 20,
          opacity: 0,
          duration: 0.7,
          ease: "sine.out",
        },
        "Navigation, -=85%"
      );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-16 py-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full md:w-xl"
      >
        <p id="mainTitle" className="text-xl text-pink-700 font-semibold">
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

        <div id="input" className="relative w-full bg-white rounded-lg shadow">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="task-title w-full h-14 px-4 pr-10 outline-none appearance-none bg-transparent"
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
        </div>

        <textarea
          id="input"
          className="task-title bg-white outline-none p-4 h-32 rounded-xl shadow mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          id="input"
          className="task-title text-white font-bold h-14 bg-red-600 rounded-lg shadow-lg cursor-pointer"
          type="submit"
        >
          {!isEditing ? "Add Task" : "Update Task"}
        </motion.button>
      </form>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-7">
        {Categories.map((cat) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={cat.name}
            id={cat.name}
            className={`text-white font-bold h-14 ${cat.color} rounded-lg shadow-lg cursor-pointer`}
            onClick={() => FilterTask(cat.name)}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Link
          id="Namaz"
          className="text-white text-center font-bold py-4 bg-fuchsia-600 rounded-lg shadow-lg cursor-pointer"
          to="/namaz"
        >
          Namaz
        </Link>

        <Link
          id="OurStory"
          className="text-white text-center font-bold py-4 bg-rose-500 rounded-lg shadow-lg cursor-pointer"
          to="https://kabooter1.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Story
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {taskArray.length > 0 ? (
          taskArray.map((task, index) => (
            <div
              key={task._id}
              className={`bg-gradient-to-r ${task.completed
                ? `${TaskColor1[index % TaskColor1.length].start} ${TaskColor1[index % TaskColor1.length].end}`
                : `${TaskColor[index % TaskColor.length].start} ${TaskColor[index % TaskColor.length].end}`
                } flex flex-col gap-2 rounded-xl shadow-lg shadow-slate-300 p-6`}
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
                  <Buttons
                    onClick={() => toggleComplete(task.id)}
                    name={!task.completed ? "Complete" : "Undo"}
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
      </div>
    </div>
  );
}

export default InputField;