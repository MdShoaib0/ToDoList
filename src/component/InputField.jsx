import React, { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";
import TaskCard from "./TaskCard";
import Navigate from "./Navigate";

const URL = "https://to-do-list-backend-rho.vercel.app/task/";
// const URL = "http://localhost:5000/task/"

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

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure we always work with an array
      const tasksArray = Array.isArray(data) ? data : [data];

      console.log("Fetched tasks:", tasksArray);
      setTaskArray(tasksArray);

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
    AddTask(newTask);
    setTitle("");
    setCategory("");
    setDescription("");
  };

  const FilterTask = (categoryName) => {
    console.log("Filter by:", categoryName);
  };

  const toggleComplete = (index) => {
    console.log("Button is Successfully Clicked"+index)
  };

  const handleDeleteTask = async (taskId) => {
    const deleteUrl = `${URL}${taskId}`;
    console.log("Making DELETE request to:", deleteUrl);

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

      });

      console.log("Delete response status:", response.status); // Add this log

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }

      const result = await response.json(); // Parse success response
      console.log("Delete result:", result);

      setTaskArray(prevTasks => prevTasks.filter(task => task._id !== taskId));

    } catch (error) {
      console.error("Unable to Delete Task:", error);
    }
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
        <Navigate name={"Namaz"} navigate={"namaz"}/>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <TaskCard taskArray={taskArray} onComplete={toggleComplete} onEdit={""} onDelete={handleDeleteTask}/>
      </div>
    </div>
  );
}

export default InputField;