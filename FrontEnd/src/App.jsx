import React, { useState, useEffect } from "react";
import Head from "./components/Head";
import FilterButtons from "./components/FilterButtons";
import { PlusCircle } from "lucide-react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  // Helper function to clean the API response
  const extractData = (resData) => {
    if (resData?.data) return resData.data;
    if (resData?.task) return resData.task;
    return resData;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://todo-app-backend-api-t0h2.onrender.com/api/v2/tasks",
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else if (Array.isArray(data.data)) {
          setTasks(data.data);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.log("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleNewTask = async (newData) => {
    try {
      const response = await fetch(
        "https://todo-app-backend-api-t0h2.onrender.com/api/v2/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        },
      );

      if (response.ok) {
        const rawData = await response.json();
        const createdTask = extractData(rawData);
        setTasks((prevTasks) => [createdTask, ...prevTasks]);
        setShowForm(false);
      }
    } catch (err) {
      console.log("Failed to add new task ...", err);
    }
  };

  const safeTasks = Array.isArray(tasks) ? tasks : tasks?.data || [];
  const filteredTask = safeTasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  const handleUpdatedTask = async (id, updatedData) => {
    try {
      const response = await fetch(
        `https://todo-app-backend-api-t0h2.onrender.com/api/v2/tasks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        const rawData = await response.json();
        const updatedTask = extractData(rawData);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            (task._id || task.id) === id ? updatedTask : task,
          ),
        );

        setEditingTask(null);
      }
    } catch (err) {
      console.error("Failed to update task: ", err);
    }
  };

  const handleDeletedTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-app-backend-api-t0h2.onrender.com/api/v2/tasks/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => (task._id || task.id) !== id),
        );
      }
    } catch (err) {
      console.log("Failed to Delete task : ", err);
    }
  };

  const handleToggleTask = async (id, currentCompletedStatus) => {
    try {
      const response = await fetch(
        `https://todo-app-backend-api-t0h2.onrender.com/api/v2/tasks/${id}/toggle`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !currentCompletedStatus }),
        },
      );

      if (response.ok) {
        const rawData = await response.json();
        const updatedTask = extractData(rawData);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            (task._id || task.id) === id ? updatedTask : task,
          ),
        );
      }
    } catch (err) {
      console.log("Toggle Task Error ...", err);
    }
  };

  return (
    <div className="min-h-screen sm:block flex bg-gradient-to-br from-gray-900 items-center via-gray-700 to-gray-500 text-center px-4 sm:px-10 py-2 ">
      <div className="sm:max-w-4xl mx-auto">
        <div className="sm:flex items-center gap-3 py-5 px-7 justify-between">
          <Head />
          <div>
            <button
              onClick={() => setShowForm(true)}
              className="flex mt-6 sm:mt-0 items-center gap-4 py-3 px-5 font-sm sm:font-medium mx-auto rounded-xl shadow-lg text-white bg-indigo-900 hover:bg-indigo-800 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-indigo-200" />
              Add New Task
            </button>
          </div>
        </div>
        <FilterButtons filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTask}
          loading={loading}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          handleUpdatedTask={handleUpdatedTask}
          handleDeletedTask={handleDeletedTask}
          handleToggleTask={handleToggleTask}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="w-full max-w-3xl p-8">
            <TaskForm
              onCancle={() => setShowForm(false)}
              handleNewTask={handleNewTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
