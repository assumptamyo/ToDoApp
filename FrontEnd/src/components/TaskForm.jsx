import React, { useState } from "react";
import { X, Plus } from "lucide-react";

function TaskForm({ onCancle, handleNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    handleNewTask({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex-1 space-y-2 p-5 rounded-lg">
      <div className="flex pb-5 justify-between gap-9 text-white">
        <h1 className="text-2xl font-bold mx-auto">Add New Task</h1>
        <button
          className="hover:text-indigo-600 transition-all duration-200"
          onClick={onCancle}
        >
          <X size={26} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-200"
            placeholder="Task Title .... "
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 resize-none rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-200 bg-gray-700 text-white"
            placeholder="Task's Description (optional) ..."
            rows={3}
          ></textarea>

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={onCancle}
              className="w-full flex items-center justify-center gap-2 py-2 px-5 bg-gray-600/50 text-white rounded-lg hover:bg-gray-800/50"
            >
              <X size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-5 bg-indigo-800/70 text-white rounded-lg hover:bg-indigo-800/50 text-sm"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
